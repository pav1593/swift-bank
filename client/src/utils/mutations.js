import { gql } from '@apollo/client'

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userId {
        _id
      }
    }
  }
`
export const CREATE_USER = gql`
mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      userId {
        _id
      }
    }
  }
`
export const OPEN_ACCOUNT = gql`
mutation openAccount($productId: ID!) {
    openAccount(productId: $productId) {
      firstName
      lastName
      accounts {
        _id
        accountNumber
        createdAt
      }
    }
  }
`
export const CHANGE_ACC_STATUS = gql`
mutation changeAccStatus($acctId: ID!, $newStatus: String!) {
    approveAccount(accountNumber: $accountNumber, newStatus: $newStatus) {
      firstName
      lastName
      accounts {
        _id
        accountNumber
        approvedAt
        status
      }
    }
  }
`
export const MAKE_TRANSACTION = gql`
mutation makeTransaction($accNum: Int!, $amount: Float!, $transferTo: Int, $type: ID) {
    makeTransaction(accNum: $accNum, amount: $amount, transferTo: $transferTo, type: $type) {
      email
      creditScore
      accounts {
        accountNumber
        transactions {
          amount
          createdAt
          _id
          transferTo
          type {
            name
          }
        }
      }
    }
  }
`
export const ADD_PRODUCT = gql`
mutation addProduct($name: String!, $description: String, $unitPrice: Float, $unitQty: Int, $termDays: Int) {
    addProduct(name: $name, description: $description, unitPrice: $unitPrice, unitQty: $unitQty, termDays: $termDays) {
      _id
      name
      description
      unitPrice
      unitQty
      termDays
    }
  }
`
export const REMOVE_PRODUCT = gql`
mutation removeProduct($id: ID!) {
    removeProduct(_id: $id) {
      _id
      name
      description
      unitPrice
      unitQty
      termDays
    }
  }
`
