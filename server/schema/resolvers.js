const {
    Account,
    Category,
    Product,
    Transaction,
    TransType,
    User
} = require('../models')

const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const accNumGen = Math.floor(Math.random()*10000) // require ('../utils/helper')

const resolvers = {
    Query: {
        getMe: async (parent, args, context) => {
            const foundUser = await User.findOne({ firstName: "Jane" })
           
            if (!foundUser) {
              throw new AuthenticationError('Cannot find a user with this id!');
            }
        
            return foundUser;
        },
        getAllUsers: async (parent, args) => {
            const allUsers = await User.find()
           
            if (!allUsers) {
              throw new AuthenticationError('Cannot find a user with this id!');
            }
        
            return allUsers;
        },
        getProducts: async (parent, args) => {
            const products = await Product.find()
           
            if (!products) {
              throw new AuthenticationError('Cannot find a user with this id!');
            }
        
            return products;
        },
        getTransTypes: async (parent, args) => {
            const transtypes = await TransType.find()
           
            if (!transtypes) {
              throw new AuthenticationError('Cannot find a user with this id!');
            }
        
            return transtypes;
        },
        getCategories: async (parent, args) => {
            const cats = await Category.find()
           
            if (!cats) {
              throw new AuthenticationError('Cannot find a user with this id!');
            }
        
            return cats;
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({email: email });
            if (!user) {
              throw new AuthenticationError("Can't find this user");
            }
        
            const correctPw = await user.isCorrectPassword(password);
        
            if (!correctPw) {
              throw new AuthenticationError('Wrong password!');
            }
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, {firstname, lastname, email, password}) => {
            const user = await User.create({firstName: firstname, lastName: lastname, email: email, password: password});
            
            if (!user) {
              throw new AuthenticationError('Something is wrong!')
            }
    
            const token = signToken(user)
        
            return { token, user };
        },
       // openAccount: async (parent, )
        openAccount: async (parent, {productId}, context) => {
            if (context.user) { //replace with context stuff for testing
                const newAcc = Account.create({userId: context.user._id, accountNumber: accNumGen, status: 'pending', product: productId})

                if (!newAcc) {
                    throw new AuthenticationError('Account could not be created')
                }

                const addAcc2User = User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { accounts: newAcc } },
                    { new: true, runValidators: true }
                )

                if (!addAcc2User) {
                    throw new AuthenticationError('Account could not be attached to User')
                }

                return addAcc2User
            }
        }, 
        approveAccount: async (parent, {accountId, newStatus}, context) => {
            if (context.user.admin) {
                return Account.findOneAndUpdate(
                    { _id: accountId },
                    { $set: { status: newStatus, approvedAt: new Date() } },
                    { new: true, runValidators: true }
                );
            }
        },
        addProduct: async (parent, {name, description, unitPrice, unitQty, termDays, category}, context) => {
            if (context.user.admin) {
                const newProd =  Product.create({name: name, description: description, unitPrice: unitPrice, unitQty: unitQty, termDays: termDays, type: category})

                if (!newProd) {
                    throw new AuthenticationError('Product could not be added')
                }

                return newProd //may need to add *addProd2Cat
            }
        },
        removeProduct: async (parent, {productId}, context) => {
            if (context.user.admin) {
                return Product.findByIdAndDelete({ _id: productId })
            }
        },
        makeTransaction: async (parent, {acctId, transferId, amount, type}, context) => {
            if (context.user) {
                const newTrans = Transaction.create({acctId: acctId, transferTo: transferId, amount: amount, type: type})

                if (!newTrans) {
                    throw new AuthenticationError('Transaction could not be created')
                }

                const add2User = Account.findOneAndUpdate(
                    { _id: acctId },
                    { $addToSet: {transactions: newTrans}},
                    { new: true, runValidators: true }
                )

                const add2Transfer = Account.findByIdAndUpdate(
                    { _id: transferId },
                    { $addToSet: {transactions: newTrans}},
                    { new: true, runValidators: true }
                )

                if(!add2User || !add2Transfer) {
                    throw new AuthenticationError('Transaction could not be added to the user and transfer account')
                }

                return newTrans
            }
        }
    }
}

module.exports = resolvers