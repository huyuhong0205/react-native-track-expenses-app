// React
import React from 'react';
// Expo
import { StatusBar } from 'expo-status-bar';
// Native base
import { Box, Text } from 'native-base';

///////////////////////////////////////////////////////////////////
export default function App() {
  // JSX ----------------------------------------------------------
  return (
    <>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="dark" />

      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        bgColor="primary.100"
      >
        <Text>Hello world!</Text>
      </Box>
    </>
  );
}
