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
      status
      createdAt
      product {
        name
        description
      }
      transactions {
        amount
      }
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
    admin
    accounts {
      _id
      status
      accountNumber
      createdAt
      product {
        name
      }
      transactions {
        amount
        approvedAt
        approverId
        _id
        createdAt
        status
        transferTo
      }
    }
  }
}
`

export const QUERY_PRODUCTS = gql`
query Products {
  getProducts {
    _id
    name
  }
}
`

export const QUERY_ACCOUNTS = gql`
query Accounts {
  getAllUsers {
    accounts {
      status
      accountNumber
      createdAt
      product {
        name
      }
    }
    admin
  }
}
`