// React
import React from 'react';
// Native base
import { NativeBaseProvider } from 'native-base';
import theme from './theme';

import App from './App';

///////////////////////////////////////////////////////////////////
export default function AppWrapper() {
  // JSX ----------------------------------------------------------
  return (
    <NativeBaseProvider theme={theme}>
      <App />
    </NativeBaseProvider>
  );
}
