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

const resolvers = {
    Query: {
        getMe: async (parent, args, context) => {
            const foundUser = await User.findOne({ _id: context.user._id })
           
            if (!foundUser) {
              throw new AuthenticationError('Cannot find a user with this id!');
            }
        
            return foundUser;
        },
        getAllUsers: async (parent, args) => {
            const allUsers = await User.findAll({})
           
            if (!allUsers) {
              throw new AuthenticationError('Cannot find a user with this id!');
            }
        
            return allUsers;
        },
        getProducts: async (parent, args) => {
            const products = await Product.findAll({})
           
            if (!products) {
              throw new AuthenticationError('Cannot find a user with this id!');
            }
        
            return products;
        },
        getTransTypes: async (parent, args) => {
            const transtypes = await TransType.findAll({})
           
            if (!transtypes) {
              throw new AuthenticationError('Cannot find a user with this id!');
            }
        
            return transtypes;
        },
        getCategories: async (parent, args) => {
            const cats = await Category.findAll({})
           
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
        openAccount: async (parent, {productId}, context) => {
            if (context.user) {
                const newAcc = Account.create({userId: context.user._id, accountNumber: 1, status: 'pending', product: productId, })

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
        
    }
}