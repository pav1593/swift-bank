const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        password: String
        accounts: [Account]
        creditScore: Int
        admin: Boolean
    }

    input InputUser{
        _id: ID
        firstName: String
        lastName: String
        email: String
        password: String
        accounts: [InputAccount]
        creditScore: Int
        admin: Boolean
    }

    type Account {
        _id: ID
        userId: String
        accountNumber: String
        alias: String
        createdAt: String
        approvedAt: String
        status: String
        product: Product
        transactions: [Transaction]
    }

    input InputAccount {
        _id: ID
        userId: String
        accountNumber: String
        alias: String
        createdAt: String
        approvedAt: String
        status: String
        product: InputProduct
        transactions: [InputTransaction]
    }

    type Transaction {
        _id: ID!
        acctId: User!
        transferTo: User!
        amount: Float!
        createdAt: String
        type: TransType!
    }

    input InputTransaction {
        _id: ID!
        acctId: InputUser!
        transferTo: InputUser!
        amount: Float!
        createdAt: String
        type: InputTransType!
    }

    type TransType {
        _id: ID!
        name: String!
    }

    input InputTransType {
        _id: ID!
        name: String!
    }

    type Category {
        _id: ID!
        name: String!
    }

    input InputCategory {
        _id: ID!
        name: String!
    }

    type Product {
        _id: ID
        name: String
        description: String
        unitPrice: Float
        unitQty: Int
        termDays: Int
        type: Category
    }

    input InputProduct {
        _id: ID
        name: String
        description: String
        unitPrice: Float
        unitQty: Int
        termDays: Int
        type: InputCategory
    }

    type Auth {
        token: ID!
        userId: User
    }

    type Query {
        getMe: User
        getAllUsers: [User]
        getProducts: [Product]
        getTransTypes: [TransType]
        getCategories: [Category]
    }

    type Mutation {
        login (email: String!, password: String!): Auth

        addUser (firstName: String!, lastName: String! email: String!, password: String!): Auth
        removeUser (_id: ID!): User
        
        openAccount (productId: InputProduct!): Account
        approveAccount (_id: ID!, status: String!): Account

        addProduct (name: String!, description: String, unitPrice: Float, unitQty: Int, termDays: Int, type: InputCategory): Product
        removeProduct (_id: ID!): Product

        makeTransaction (acctId: InputUser!, transferTo: InputUser!, amount: Int!, type: InputTransType): Account       
    }
`
module.exports = typeDefs