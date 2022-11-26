const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        accounts: [Account]
        creditScore: Int
        admin: Boolean!
    }

    input InputUser{
        _id: ID
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        accounts: [InputAccount]
        creditScore: Int
        admin: Boolean!
    }

    type Account {
        _id: ID
        userId: String
        accountNumber: String!
        alias: String
        createdAt: String
        approvedAt: String
        status: String
        product: [Product]
        transactions: [Transaction]
    }

    input InputAccount {
        _id: ID
        userId: String
        accountNumber: String!
        alias: String
        createdAt: String
        approvedAt: String
        status: String
        product: [InputProduct]
        transactions: [InputTransaction]
    }

    type Transaction {
        _id: ID!
        acctId: Int!
        transferTo: Int
        amount: Float!
        createdAt: String
        type: TransType
    }

    input InputTransaction {
        _id: ID!
        acctId: Int!
        transferTo: Int
        amount: Float!
        createdAt: String
        type: ID
    }

    type TransType {
        _id: ID!
        name: String!
    }

    input InputTransType {
        _id: ID!
        name: String!
    }

    type Product {
        _id: ID
        name: String!
        description: String
        unitPrice: Float!
        unitQty: Int
        termDays: Int
    }

    input InputProduct {
        _id: ID
        name: String!
        description: String
        unitPrice: Float!
        unitQty: Int
        termDays: Int
    }

    type Auth {
        token: ID!
        userId: [User]
    }

    type Query {
        getMe: User
        getAllUsers: [User]
        getProducts: [Product]
        getTransTypes: [TransType]
    }

    type Mutation {
        login (email: String!, password: String!): Auth

        addUser (firstName: String!, lastName: String! email: String!, password: String!): Auth
        
        openAccount (productId: ID!): User
        approveAccount (accountNumber: Int!, newStatus: String!): User

        addProduct (name: String!, description: String, unitPrice: Float, unitQty: Int, termDays: Int): Product
        removeProduct (_id: ID!): Product

        makeTransaction (accNum: Int!, transferTo: Int, amount: Float!, type: ID): User       
    }
`
module.exports = typeDefs