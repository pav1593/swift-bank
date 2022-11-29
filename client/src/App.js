import React from "react";
import Container from './components/ContentContainer'
import { UserProvider } from "./components/GlobalState";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


const App = () => {
  return(
    <ApolloProvider client={client}>
      <UserProvider>
        <div className="App">
          <Container/>
        </div>
      </UserProvider>
    </ApolloProvider>
  )
}

export default App;
