import * as React from 'react';
import './index.css';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  extendTheme,
  theme as base,
} from '@chakra-ui/react';
import Header from './components/header';

const theme = extendTheme({
  fonts: {
    heading: `Montserrat, ${base.fonts?.heading}`,
    body: `Montserrat, ${base.fonts?.body}`,
  }
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <Header />
  </ChakraProvider>
)
