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
        type: Transtype
    }

    input Transtype {
        _id: ID!
        name: String!
    }

    type Transfer {
        _id: ID!
        accountId: Account!
        amount: Float!
    }

    input InputCategory {
        _id: ID!
        name: String!
    }

    type Product {
        userId: User!
        accountId: Account!
        category: 
        amount: Float!
        interest: Float!
        approved: Boolean!
        createdAt: String
        approvedAt: String
    }

    type Auth {
        token: ID!
        userId: User
    }

    type Query {
        getUser: User
        getAllUsers: User
    }

    type Mutation {
        login (email: String!, password: String!): Auth
        addUser (firstName: String!, lastName!: String! email: String!, password: String!): Auth
        removeUser (_id: ID!): User
        openAccount (productId: Product!, UserId: inputUser!): Account
        closeAccount (_id: ID!): Account
        addProduct (name: String!): Product
        removeProduct (_id: ID!): Product
        transfer (accountId: InputAccount!, amount: Float!): Account
        makeTransaction (to: InputUser!, from: InputUser!, amount: Int!): Transaction
        createLoan (UserId: InputUser!, accountId: InputAccount!, amount: Float!, interest: Float!, approved: false): Loan
        approveLoan (_id: ID!): Loan
        deleteLoan (_id: ID!): Loan
    }
`
module.exports = typeDefs