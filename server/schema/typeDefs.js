const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        accounts: [Account]
        credit score: Int
        admin: Boolean!
    }

    input InputUser{
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        accounts: [Account]
        credit score: Int
        admin: Boolean!
    }

    type Account {
        _id: ID!
        userId: User!
        accountNumber: String!
        alias: String
        createdAt: String
        approvedAt: String
        status: String
        product: Product
        transactions: [Transaction]
    }

    input InputAccount {
        _id: ID!
        userId: User!
        accountNumber: String!
        alias: String
        createdAt: String
        approvedAt: String
        status: String
        product: Product
        transactions: [Transaction]
    }

    type Transaction {
        _id: ID!
        acctId: User!
        transferTo: User!
        amount: Float!
        createdAt: String
        type: Transtype!
    }

    input Transtype {
        _id: ID!
        name: String!
    }

    input Category {
        _id: ID!
        name: String!
    }

    type Product {
        _id: ID!
        name: String!
        description: String
        unitPrice: Float!
        unitQty: Int
        termDays: Int!
        type: Category
    }

    type Auth {
        token: ID!
        userId: User
    }

    type Query {
        getMe: User
        getAllUsers: User
        getProducts: Product
        getTranstypes: Transtypes
        getCategories: Category
    }

    type Mutation {
        login (email: String!, password: String!): Auth

        addUser (firstName: String!, lastName!: String! email: String!, password: String!): Auth
        removeUser (_id: ID!): User

        openAccount (productId: Product!): Account
        approveAccount (_id: ID!): Account
        closeAccount (_id: ID!): Account

        addProduct (name: String!, unitPrice: Float, termDays: Int, type: Category): Product
        removeProduct (_id: ID!): Product

        makeTransaction (acctId: InputUser!, transferTo: InputUser!, amount: Int!, type: Transtype): Account       
    }
`
module.exports = typeDefs