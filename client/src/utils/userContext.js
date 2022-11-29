import React, { createContext, useContext } from 'react';

export const UserContext = createContext(); // Create user context

export const useUser = () => useContext(userContext); // custom hook to access userContext

export default function userProvider(props){
  return <userContext.Provider {...props}/>
}