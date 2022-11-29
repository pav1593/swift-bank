import React, {createContext, useContext} from 'react';
import { useUserReducer } from '../utils/reducers';

const UserContext = createContext(); // create user context
const {Provider} = UserContext; // isolates provider from context, provider feeds to state change observers, consumers

const UserProvider = ({ value = [], ...props }) => { 
  const [state, dispatch] = useUserReducer({
    isLoggedIn: false,
    isAdmin: false,
    userName: 'admin',
    clientId: ""
  });

  return <Provider value={[state, dispatch]} {...props}/> // pass the state and dispatch from the reducer to the provider
};

const useUserContext = () => useContext(UserContext); // define function to use user context

export { UserProvider, useUserContext }