// React
import React from 'react';
// Native base
import { HStack, Text, Switch, useColorMode } from 'native-base';

///////////////////////////////////////////////////////////////////
export default function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  // JSX ----------------------------------------------------------
  return (
    <HStack space={2} alignItems="center">
      <Text>Light</Text>
      <Switch
        isChecked={colorMode === 'dark'}
        onToggle={toggleColorMode}
        colorScheme="primary"
      />
      <Text>Dark</Text>
    </HStack>
  );
}
