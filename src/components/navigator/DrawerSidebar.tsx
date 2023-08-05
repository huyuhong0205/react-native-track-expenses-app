/* React */
import React, { useCallback } from 'react';
/* Navigation */
import { DrawerContentComponentProps } from '@react-navigation/drawer';
/* Native base */
import { VStack, Box, Center, Image } from 'native-base';

/* Components */
import MenuButton from './MenuButton';
import ThemeToggle from '../ThemeToggle';

/* //////////////////////////////////////////////////////////////// */
type Props = DrawerContentComponentProps;

export default function DrawerSidebar({
  state: routeState,
  navigation,
}: Props) {
  const { name: currentRoute } = routeState.routes[routeState.index];

  const handlePressExpensesMenu = useCallback(() => {
    navigation.navigate('expenses_screen');
  }, [navigation]);

  const handlePressCategoriesMenu = useCallback(() => {
    navigation.navigate('categories_screen');
  }, [navigation]);

  /* JSX ---------------------------------------------------------- */
  return (
    <Box
      safeArea
      flex={1}
      padding={2}
      _light={{ bgColor: 'muted.100' }}
      _dark={{ bgColor: 'muted.900' }}
    >
      <VStack space={2}>
        <Image
          source={require('../../assets/icon.png')}
          alt="app icon"
          height="200px"
          width="200px"
          marginX="auto"
        />

        <MenuButton
          active={currentRoute === 'expenses_screen'}
          onPress={handlePressExpensesMenu}
          icon="wallet"
        >
          Expenses
        </MenuButton>
        <MenuButton
          active={currentRoute === 'categories_screen'}
          onPress={handlePressCategoriesMenu}
          icon="archive"
        >
          Categories
        </MenuButton>
      </VStack>

      <Center marginTop="auto" marginBottom={5}>
        <ThemeToggle />
      </Center>
    </Box>
  );
}
