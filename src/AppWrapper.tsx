// React
import React from 'react';
// Navigation
// import { NavigationContainer } from '@react-navigation/native';
// Native base
import { NativeBaseProvider } from 'native-base';
import theme from './theme';

import App from './App';

///////////////////////////////////////////////////////////////////
export default function AppWrapper() {
  // JSX ----------------------------------------------------------
  return (
    // <NavigationContainer>
    <NativeBaseProvider theme={theme}>
      <App />
    </NativeBaseProvider>
    // </NavigationContainer>
  );
}
