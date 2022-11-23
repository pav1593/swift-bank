const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Client {
        _id: ID!
        username: String!
        email: String!
        password: String!
        accounts: [Account]
        loans: [Loan]
        transactions: [Transaction]
        credit score: Int
    }

    input InputClient{
        _id: ID!
        username: String!
        email: String!
        password: String!
        accounts: [Account]
        loans: [Loan]
        transactions: [Transaction]
        credit score: Int
    }

    type Admin {
        _id: ID!
        email: String! 
        password: String!
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
        clientId: Client!
        transactions: [Transaction]
    }

    input InputAccount {
        _id: ID!
        productId: Product!
        clientId: Client!
        transactions: [Transaction]
    }

    type Transaction {
        _id: ID!
        to: Client!
        from: Client!
        amount: Float!
        createdAt: String
    }

    type Transfer {
        _id: ID!
        accountId: Account!
        amount: Float!
    }

    type Loan {
        clientId: Client!
        accountId: Account!
        amount: Float!
        interest: Float!
        approved: Boolean!
        createdAt: String
        approvedAt: String
    }

    type Auth {
        token: ID!
        clientId: Client
    }

    type AdminAuth {
        token: ID!
        adminId: Admin
    }

    type Query {
        getClient: Client
        getAllClients: Client
    }

    type Mutation {
        login (username: String!, password: String!): Auth
        adminLogin (email: String!, password: String!): AdminAuth
        addClient (username: String!, email: String!, password: String!): Auth
        removeClient (_id: ID!): Client
        openAccount (productId: Product!, clientId: inputClient!): Account
        closeAccount (_id: ID!): Account
        addProduct (name: String!): Product
        removeProduct (_id: ID!): Product
        transfer (accountId: InputAccount, amount: Float!): Account
        makeTransaction (to: InputClient!, from: InputClient!, amount: Int!): Transaction
        createLoan (clientId: InputClient!, accountId: InputAccount, amount: Float!, interest: Float!, approved: false): Loan
    }
`
module.exports = typeDefs