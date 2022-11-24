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
    }
}