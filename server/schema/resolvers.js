const {
    Product,
    TransType,
    User
} = require('../models')

const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getMe: async (parent, args, context) => {
            let {_id} = args;
            const foundUser = await User.findOne({ _id}) // need to change to context.user._id in production
           
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
        getPendingTrans: async (parent, args) => {
            const allPendingT = await User.find({})
            const {status} = args;

            if(!allPendingT) {
                throw new AuthenticationError('Aiyah')
            }

            return allPendingT.filter((a) => a.accounts.transactions.status == status)
        },
        getPendingAcc: async (parent, args) => {
            const {status} = args;
            const allPendingA = await User.find({
                "accounts.status": status
            })    

            if(!allPendingA) {
                throw new AuthenticationError('Aiyah')
            }

            return allPendingA
        }
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
            if (true) { //replace with context stuff for testing
                var queryData;
                
                const query = await Product.findOne({_id:productId})
                    .then((data)=> queryData = data);

                const addAcc2User = User.findOneAndUpdate(
                    { _id: "63ed086c8d4ae45ae40d891d" },
                    { $addToSet: { accounts: {product: query , userId: "63ed086c8d4ae45ae40d891d"} } },
                    { new: true, runValidators: true }
                )

                if (!addAcc2User) {
                    throw new AuthenticationError('Account could not be attached to User')
                }

                return addAcc2User
            }
        }, 
        approveAccount: async (parent, { acctId, newStatus}, context) => {
            if (true) { //  context.user.admin in production
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
            if (true) { // context.user.admin in prod
                const newProd =  Product.create({name: name, description: description, unitPrice: unitPrice, unitQty: unitQty, termDays: termDays})

                if (!newProd) {
                    throw new AuthenticationError('Product could not be added')
                }

                return newProd
            }
        },
        removeProduct: async (parent, args, context) => {
            if (true) { //context.user.admin in prod
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
            if (true) { // need to change to context.user.amdin in prod

                //const query = await TransType.findOne({name: type})
                    //.then((data)=> queryData = data);
                
                // const tQuery = await TransType.findOne({_id: type})
                //     .then((data)=> queryData = data);

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
                        type: query
                    }}},
                    { new: true, runValidators: true}
                )

                if(!add2User || !add2Transfer) {
                    throw new AuthenticationError('Transaction could not be added to the user and transfer account')
                }

                return Promise.all([add2User, add2Transfer])
            }
        },

        approveTransaction: async (parent, { transId, status, approverId }, context) => {
            if (true) {
                const approve = await User.updateMany(
                    { },
                    { $set:  {"accounts.$[].transactions.$[t].status": status,
                              "accounts.$[].transactions.$[t].approvedAt": new Date(), 
                              "accounts.$[].transactions.$[t].approverId": approverId
                            }},
                    { arrayFilters: [ { "t._id": transId } ] },
                    //{ new: true, runValidators: true}
                )

                return approve
            }
        } 
    }
}

module.exports = resolvers
