import { gql } from '@apollo/client'

export const GetMe = gql`
query GetMe {
    getMe {
      accounts {
        accountNumber
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