import { gql } from '@apollo/client'

export const QUERY_GETME = gql`
query GetMe {
  getMe {
    firstName
    lastName
    _id
    accounts {
      _id
      accountBalance
      product {
        name
        description
      }
      status
      transactions {
        amount
        createdAt
        type {
          name
        }
      }
    }
  }
}
`
export const QUERY_ALL_USERS = gql`
query AllUsers {
  getAllUsers {
    _id
    accounts {
      _id
      createdAt
      product {
        name
        description
      }
      transactions {
        amount
      }
      status
    }
    creditScore
    firstName
    lastName
  }
}
`
export const QUERY_USER_TRANSACTIONS = gql`
query UserTransactions {
  getAllUsers {
    firstName
    lastName
    accounts {
      accountNumber
      transactions {
        amount
        createdAt
        status
        approvedAt
        approverId
      }
    }
  }
}
`