// React
import React, { useCallback } from 'react';
// Navigation
import { CompositeScreenProps } from '@react-navigation/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { StackScreenProps } from '@react-navigation/stack';
// Native base
import { Box, Text, Button } from 'native-base';

// Components
import DrawerNavbar from '../components/navigator/DrawerNavbar';
// Types
import { TDrawerParamList, TStackParamList } from '../types/TypeNavigator';

///////////////////////////////////////////////////////////////////
type Props = CompositeScreenProps<
  DrawerScreenProps<TDrawerParamList, 'expenses_screen'>,
  StackScreenProps<TStackParamList>
>;

export default function ExpensesScreen({ navigation }: Props) {
  const handleGoExpenseForm = useCallback(() => {
    navigation.navigate('expense_form_screen');
  }, [navigation]);

  // JSX ----------------------------------------------------------
  return (
    <>
      <DrawerNavbar title="Expenses" />

      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        _light={{ bgColor: 'bgLightMode' }}
        _dark={{ bgColor: 'bgDarkMode' }}
      >
        <Text marginBottom={10}>Expenses Screen</Text>
        <Button onPress={handleGoExpenseForm}>go expense form</Button>
      </Box>
    </>
  );
}
