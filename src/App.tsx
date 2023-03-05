// React
import React from 'react';
// Expo
import { StatusBar } from 'expo-status-bar';
// Native base
import { VStack, Box, Text, useColorModeValue } from 'native-base';

import ThemeToggle from './components/ThemeToggle';

///////////////////////////////////////////////////////////////////
export default function App() {
  // JSX ----------------------------------------------------------
  return (
    <>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style={useColorModeValue('dark', 'light')} />

      <VStack
        flex={1}
        space={4}
        justifyContent="center"
        alignItems="center"
        bgColor={useColorModeValue('bgLight', 'bgDark')}
      >
        <Text>Hello world!</Text>
        <Box
          height={20}
          width={20}
          bgColor={useColorModeValue('primary.700', 'primary.500')}
        />
        <ThemeToggle />
      </VStack>
    </>
  );
}
