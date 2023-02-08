import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import * as ReactDOM from 'react-dom/client';
import * as React from 'react';
import { App } from './App';


const authLink = setContext((req, { headers }) => {
  const token = '';
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` }: undefined)
    }
  };
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/api',
  cache: new InMemoryCache(),
  link: authLink.concat(createHttpLink({ uri: '/api', })),
});

const container = document.getElementById('root')!;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <ApolloProvider client={client}>
        <ColorModeScript />
        <App />
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
