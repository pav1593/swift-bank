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
mutation approveAccount($acctId: ID!, $newStatus: String!) {
  approveAccount(acctId: $acctId, newStatus: $newStatus) {
    firstName
    lastName
    accounts {
      _id
      createdAt
      approvedAt
      status
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
mutation makeTransaction($acctId: ID!, $amount: Float!, $transferId: ID!, $type: ID) {
  makeTransaction(acctId: $acctId, amount: $amount, transferId: $transferId, type: $type) { 
    accounts {
      transactions {
        amount
        _id
        createdAt
        transferTo
        type {
          name
        }
      }
    }
  }
}
`
export const CHANGE_TRANS_STATUS = gql`
mutation changeTransStatus($transId: ID!, $status: String, $approverId: ID) {
  approveTransaction(transId: $transId, status: $status, approverId: $approverId) {
    accounts {
      transactions {
        amount
        _id
        createdAt
        transferTo
        type {
          name
        }
        status
        approvedAt
        approverId
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
