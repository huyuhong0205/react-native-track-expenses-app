/* React */
import React, { useCallback, useMemo } from 'react';
/* Navigation */
import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { StackScreenProps } from '@react-navigation/stack';
/* Native base */
import { VStack, Fab, Text, Button, Icon } from 'native-base';

/* DB */
import { useQuery } from '../models/realm';
import Category from '../models/categorySchema';
import Expense from '../models/expenseSchema';
/* Components */
import CustomIcon from '../atoms/CustomIcon';
import DrawerNavbar from '../components/navigator/DrawerNavbar';
/* Types */
import { TDrawerParamList, TStackParamList } from '../types/TypeNavigator';

/* //////////////////////////////////////////////////////////////// */
type Props = CompositeScreenProps<
  DrawerScreenProps<TDrawerParamList, 'expenses_screen'>,
  StackScreenProps<TStackParamList>
>;

export default function ExpensesScreen({ navigation }: Props) {
  const isFocused = useIsFocused();

  const categoriesInRealm = useQuery(Category);
  const expensesInRealm = useQuery(Expense);

  const categories = useMemo(() => {
    const categoriesMap: Record<
      string,
      { categoryName: string; iconName: string }
    > = {};

    categoriesInRealm.forEach((categoryInRealm) => {
      categoriesMap[String(categoryInRealm._id)] = {
        categoryName: categoryInRealm.categoryName,
        iconName: categoryInRealm.iconName,
      };
    });

    return categoriesMap;
  }, [categoriesInRealm]);
  console.log(categories);

  /* Event handler ------------------------------------------------ */
  const handleGoExpenseForm = useCallback(() => {
    navigation.navigate('expense_form_screen');
  }, [navigation]);

  /* JSX ---------------------------------------------------------- */
  return (
    <>
      <DrawerNavbar title="Expenses" />

      <VStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        _light={{ bgColor: 'bgLightMode' }}
        _dark={{ bgColor: 'bgDarkMode' }}
      >
        <Text marginBottom={10}>Expenses Screen</Text>
        <Button onPress={handleGoExpenseForm}>go expense form</Button>

        {isFocused && (
          <Fab
            onPress={handleGoExpenseForm}
            position="absolute"
            bottom="30px"
            right="30px"
            icon={<Icon as={CustomIcon} name="add_circle" size="2xl" />}
          />
        )}
      </VStack>
    </>
  );
}
