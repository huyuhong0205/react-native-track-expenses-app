// React
import React from 'react';
// Native base
import { Box, Text } from 'native-base';

// Components
import StackNavbar from '../components/Navigator/StackNavbar';

///////////////////////////////////////////////////////////////////
export default function ExpenseFormScreen() {
  // JSX ----------------------------------------------------------
  return (
    <>
      <StackNavbar title="Add new expense" />

      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        _light={{ bgColor: 'bgLightMode' }}
        _dark={{ bgColor: 'bgDarkMode' }}
      >
        <Text>Expense Form Screen</Text>
      </Box>
    </>
  );
}
