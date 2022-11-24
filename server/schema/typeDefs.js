const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        accounts: [Account]
        loans: [Loan]
        transactions: [Transaction]
        credit score: Int
        isAdmin: Boolean!
    }

    input InputUser{
        _id: ID!
        username: String!
        email: String!
        password: String!
        accounts: [Account]
        loans: [Loan]
        transactions: [Transaction]
        credit score: Int
    }

    type Product {
        _id: ID!
        name: String!
    }

    input InputProduct {
        _id: ID!
        name: String!
    }

    type Account {
        _id: ID!
        productId: Product!
        userId: User!
        transactions: [Transaction]
    }

    input InputAccount {
        _id: ID!
        productId: Product!
        userId: User!
        transactions: [Transaction]
    }

    type Transaction {
        _id: ID!
        to: User!
        from: User!
        amount: Float!
        createdAt: String
    }

    type Transfer {
        _id: ID!
        accountId: Account!
        amount: Float!
    }

    type Loan {
        userId: User!
        accountId: Account!
        amount: Float!
        interest: Float!
        approved: Boolean!
        createdAt: String
        approvedAt: String
    }

    type Auth {
        token: ID!
        cuserId: User
    }

    type Query {
        getClient: Client
        getAllClients: Client
    }

    type Mutation {
        login (username: String!, password: String!): Auth
        addClient (username: String!, email: String!, password: String!): Auth
        removeClient (_id: ID!): Client
        openAccount (productId: Product!, clientId: inputClient!): Account
        closeAccount (_id: ID!): Account
        addProduct (name: String!): Product
        removeProduct (_id: ID!): Product
        transfer (accountId: InputAccount!, amount: Float!): Account
        makeTransaction (to: InputClient!, from: InputClient!, amount: Int!): Transaction
        createLoan (clientId: InputClient!, accountId: InputAccount!, amount: Float!, interest: Float!, approved: false): Loan
        approveLoan (_id: ID!): Loan
        deleteLoan (_id: ID!): Loan
    }
`
module.exports = typeDefs