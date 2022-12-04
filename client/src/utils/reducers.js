import { useReducer } from 'react';
import {
  OPEN_ACCOUNT,
  CREATE_USER,
  CHANGE_ACC_STATUS,
  MAKE_TRANSACTION,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  LOGIN,
} from './actions';

export const reducer = (state,action) => {
  switch (action.type) {
    case OPEN_ACCOUNT: {
      const newAccount = action.payload;
      return {
        ...state,
        accounts: [...state.accounts, newAccount],
      }
    }
    case CREATE_USER: {
      const newUser = action.payload;
      console.log(action.payload)
      return {
        ...state,
        users: [...state.users, newUser]
      }
    }
    case CHANGE_ACC_STATUS: {
      const accIndex = state.accounts.findIndex((account) => account.id === action.payload.id); // locate index
      const updatedAccount = { // set updated object
        ...state.accounts[accIndex],
        ...action.payload,
      };
      const list = [...state.accounts];
      list[accIndex] = updatedAccount;

      return {
        ...state,
        accounts: list,
      }
    }
    case MAKE_TRANSACTION: {
      const newTransaction = action.payload;
      return {
        ...state,
        transactions: [...state.transactions, newTransaction]
      }
    }
    case ADD_PRODUCT: {
      const newProduct = action.payload;
      return {
        ...state,
        products: [...state.products, newProduct]
      }
    }
    case REMOVE_PRODUCT: {
      return {
        ...state,
        products: [...state.products].filter((product) => product !== action.payload)
      }
    }
    case LOGIN: {
      return{
        ...state,
        isLoggedIn: !action.isLoggedIn,
      }
    }
    default:
      return state;
  }
}

export function useUserReducer (initialState) {
  return useReducer(reducer, initialState);
}