/* React */
import React, { useCallback, useMemo } from 'react';
/* Navigation */
import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { StackScreenProps } from '@react-navigation/stack';
/* Native base */
import { VStack, FlatList, Fab, Icon } from 'native-base';

/* DB */
import { useQuery } from '../models/realm';
import Category from '../models/categorySchema';
import Expense from '../models/expenseSchema';
/* Components */
import CustomIcon from '../atoms/CustomIcon';
import DrawerNavbar from '../components/navigator/DrawerNavbar';
import ExpenseItem from '../components/expense/ExpenseItem';
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

  /* Event handler ------------------------------------------------ */
  const handleGoExpenseFormScreen = useCallback(() => {
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
        <FlatList
          flex={1}
          width="full"
          padding={2}
          data={expensesInRealm}
          keyExtractor={(expense) => String(expense._id)}
          renderItem={({ item: expense }) => (
            <ExpenseItem
              _id={String(expense._id)}
              title={expense.title}
              amount={expense.amount}
              isExpense={expense.isExpense}
              date={expense.date}
              // categoryName={categories[String(expense.categoryId)].categoryName}
              iconName={categories[String(expense.categoryId)].iconName}
            />
          )}
        />

        {isFocused && (
          <Fab
            onPress={handleGoExpenseFormScreen}
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
