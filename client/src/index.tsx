import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import './index.css';
import { cookies } from './components/signin';

const authLink = setContext((req, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = cookies.access_token as string;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/api',
  cache: new InMemoryCache(),
  link: authLink.concat(createHttpLink({
    uri: '/api',
  })),
});

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <ApolloProvider client={client}>
    {/* <Provider store={store}> */}
      <App />
    {/* </Provider> */}
  </ApolloProvider>
);
