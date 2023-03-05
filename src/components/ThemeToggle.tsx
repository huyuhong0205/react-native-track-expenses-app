// React
import React from 'react';
// Native base
import { HStack, Text, Switch, useColorMode } from 'native-base';

///////////////////////////////////////////////////////////////////
export default function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  // JSX ----------------------------------------------------------
  return (
    <HStack
      space={2}
      alignItems="center"
      bgColor="red.100" // [TEMP]
    >
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === 'light'}
        onToggle={toggleColorMode}
        colorScheme="primary"
      />
      <Text>Light</Text>
    </HStack>
  );
}
