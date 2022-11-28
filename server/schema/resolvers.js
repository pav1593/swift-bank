const {
    Product,
    //TransType,
    User
} = require('../models')

const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

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
            const allUsers = await User.find({})
           
            if (!allUsers) {
              throw new AuthenticationError('Cannot find a user with this id!');
            }
        
            return allUsers;
        },
        getProducts: async (parent, args) => {
            const products = await Product.find({})
           
            if (!products) {
              throw new AuthenticationError('Cannot find a user with this id!');
            }
        
            return products;
        },
        // getTransTypes: async (parent, args) => {
        //     const transtypes = await TransType.find({})
           
        //     if (!transtypes) {
        //       throw new AuthenticationError('Cannot find a user with this id!');
        //     }
        
        //     return transtypes;
        // },
        // getCategories: async (parent, args) => {
        //     const cats = await Category.find({})
           
        //     if (!cats) {
        //       throw new AuthenticationError('Cannot find a user with this id!');
        //     }
        
        //     return cats;
        // },
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
        addUser: async (parent, {firstName, lastName, email, password}) => {
            const user = await User.create({firstName: firstName, lastName: lastName, email: email, password: password});
            
            if (!user) {
              throw new AuthenticationError('Something is wrong!')
            }
    
            const token = signToken(user)
        
            return { token, user };
        },
        openAccount: async (parent, {productId}, context) => {
            if (context.user) { //replace with context stuff for testing
                var queryData;
                
                const query = await Product.findOne({_id:productId})
                    .then((data)=> queryData=data);

                const addAcc2User = User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { accounts: {product: query , userId: context.user._id} } },
                    { new: true, runValidators: true }
                )

                if (!addAcc2User) {
                    throw new AuthenticationError('Account could not be attached to User')
                }

                return addAcc2User
            }
        }, 
        approveAccount: async (parent, { acctId, newStatus}, context) => {
            if (context.user.admin) {
                const cheese = User.findOneAndUpdate( 
                { "accounts._id": acctId},                    
                { $set:  {"accounts.$.status": newStatus, "accounts.$.approvedAt": new Date() } },
                { new: true, runValidators: true }
                )
                if(!cheese) {
                    throw new AuthenticationError('Aiyah')
                }
                return cheese
            }
        },
        addProduct: async (parent, {name, description, unitPrice, unitQty, termDays}, context) => {
            if (context.user.admin) {
                const newProd =  Product.create({name: name, description: description, unitPrice: unitPrice, unitQty: unitQty, termDays: termDays})

                if (!newProd) {
                    throw new AuthenticationError('Product could not be added')
                }

                return newProd
            }
        },
        removeProduct: async (parent, args, context) => {
            if (context.user.admin) {
                return Product.findOneAndDelete( args , function (err, res) {
                    if (err){
                        console.log(err)
                    }
                    else{
                        console.log("Deleted Product: ", res, args);
                    }
                })
            }
        },
        makeTransaction: async (parent, {acctId, transferId, amount, type}, context) => {
            if (true) {

                const add2User = User.findOneAndUpdate(
                    { "accounts._id": acctId },
                    { $addToSet: {"accounts.$.transactions": {
                        acctId: acctId,
                        transferId: transferId,
                        amount: amount, 
                        type: type
                    }}},
                    { new: true, runValidators: true}
                )
                
                const add2Transfer = User.findOneAndUpdate(
                    { "accounts._id": transferId },
                    { $addToSet: {"accounts.$.transactions": {
                        acctId: transferId,
                        transferId: acctId,
                        amount: -amount, 
                        type: type
                    }}},
                    { new: true, runValidators: true}
                )

                if(!add2User || !add2Transfer) {
                    throw new AuthenticationError('Transaction could not be added to the user and transfer account')
                }

                return Promise.all([add2User, add2Transfer])
            }
        }
    }
}

module.exports = resolvers
