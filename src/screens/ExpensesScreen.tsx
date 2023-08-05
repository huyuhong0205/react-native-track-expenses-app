/* React */
import React, { useCallback, useEffect, useState, useMemo } from 'react';
/* Navigation */
import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { StackScreenProps } from '@react-navigation/stack';
/* Native base */
import { VStack, HStack, FlatList, Box, Text, Fab, Icon } from 'native-base';
/* Date fns */
import { format } from 'date-fns';

/* DB */
import { useQuery } from '../models/realm';
import Category from '../models/categorySchema';
import Expense from '../models/expenseSchema';
/* Components */
import CustomIcon from '../atoms/CustomIcon';
import DrawerNavbar from '../components/navigator/DrawerNavbar';
import Calendar from '../components/expense/Calendar';
import ExpenseItem from '../components/expense/ExpenseItem';
/* Hooks */
import useRealmQuery from '../hooks/useRealmQuery';
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

  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const [currentYearMonth, setCurrentYearMonth] = useState<{
    year: number;
    month: number;
  }>({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 });
  const [expenses, setExpenses] =
    useState<Realm.Results<Expense & Realm.Object<unknown, never>>>();

  const { expensesQuery } = useRealmQuery();

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

  const totalAmount = useMemo(() => {
    if (!expenses) return 0;

    return expenses.reduce(
      (accumulator, expense) =>
        expense.isExpense
          ? accumulator - expense.amount
          : accumulator + expense.amount,
      0
    );
  }, [expenses]);

  useEffect(() => {
    if (!isFocused) return;

    const queryExpenses = expensesQuery(
      pickedDate,
      currentYearMonth.year,
      currentYearMonth.month
    );

    setExpenses(queryExpenses);
  }, [expensesQuery, pickedDate, currentYearMonth, isFocused]);

  /* Event handler ------------------------------------------------ */
  const handlePickDateInCalendar = useCallback((dateString: string) => {
    if (dateString === '') setPickedDate(null);
    else setPickedDate(new Date(dateString));
  }, []);

  const handleChangeInCalendar = useCallback((year: number, month: number) => {
    setPickedDate(null);
    setCurrentYearMonth({ year, month });
  }, []);

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
        <Calendar
          isFocused={isFocused}
          curYear={currentYearMonth.year}
          curMonth={currentYearMonth.month}
          onPickDateInCalendar={handlePickDateInCalendar}
          onChangeMonthInCalendar={handleChangeInCalendar}
        />

        <Box width="95%" paddingX={3} borderRadius="full" bgColor="#3b82f655">
          <HStack alignItems="center">
            <Text fontSize="lg">
              {pickedDate
                ? format(pickedDate, 'yyyy/MM/dd')
                : `${currentYearMonth.year}/${String(
                    currentYearMonth.month
                  ).padStart(2, '0')}`}
            </Text>
            <Text
              marginLeft="auto"
              fontSize="xl"
              fontWeight="medium"
              color={totalAmount <= 0 ? 'red.500' : 'green.500'}
            >
              {totalAmount}
            </Text>
          </HStack>
        </Box>

        {expenses && expenses.length > 0 ? (
          <FlatList
            flex={1}
            width="full"
            margin={2}
            data={expenses}
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
        ) : (
          <Box flex={1} width="full">
            <Text padding={4} fontSize="lg" textAlign="center">
              No expenses found.
            </Text>
          </Box>
        )}

        {isFocused && (
          <Fab
            onPress={handleGoExpenseFormScreen}
            position="absolute"
            bottom="30px"
            right="30px"
            icon={<Icon as={CustomIcon} name="add" size="2xl" />}
          />
        )}
      </VStack>
    </>
  );
}
