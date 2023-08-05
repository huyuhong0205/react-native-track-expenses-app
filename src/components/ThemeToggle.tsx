/* React */
import React from 'react';
/* Native base */
import { HStack, Icon, Switch, useColorMode } from 'native-base';

/* Components */
import CustomIcon from '../atoms/CustomIcon';
/* Hooks */
import useSetting from '../hooks/useSetting';

/* //////////////////////////////////////////////////////////////// */
export default function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  const { setColorMode } = useSetting();

  /* Event handler ------------------------------------------------ */
  const handleSwitchColorMode = async () => {
    toggleColorMode();
    await setColorMode(colorMode === 'light' ? 'dark' : 'light');
  };

  /* JSX ---------------------------------------------------------- */
  return (
    <HStack space={2} alignItems="center">
      <Icon as={CustomIcon} name="brightness_low" size="lg" />
      <Switch
        isChecked={colorMode === 'dark'}
        onToggle={handleSwitchColorMode}
        colorScheme="primary"
      />
      <Icon as={CustomIcon} name="brightness_4" size="lg" />
    </HStack>
  );
}
