/* React */
import React, { useCallback, useEffect, useState, useMemo } from 'react';
/* Navigation */
import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { StackScreenProps } from '@react-navigation/stack';
/* Native base */
import { VStack, FlatList, Box, Text, Fab, Icon } from 'native-base';

/* DB */
import { useQuery, useRealm } from '../models/realm';
import Category from '../models/categorySchema';
import Expense from '../models/expenseSchema';
/* Components */
import CustomIcon from '../atoms/CustomIcon';
import DrawerNavbar from '../components/navigator/DrawerNavbar';
import Calendar from '../components/expense/Calendar';
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

  const realm = useRealm();
  const categoriesInRealm = useQuery(Category);

  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const [currentYearMonth, setCurrentYearMonth] = useState<{
    year: number;
    month: number;
  }>({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 });
  const [expenses, setExpenses] =
    useState<Realm.Results<Expense & Realm.Object<unknown, never>>>();

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

  useEffect(() => {
    const startDate =
      pickedDate ||
      new Date(
        `${currentYearMonth.year}-${String(currentYearMonth.month).padStart(
          2,
          '0'
        )}-01`
      );
    const endDate = pickedDate
      ? new Date(pickedDate.getTime() + 24 * 60 * 60 * 1000 - 1)
      : new Date(
          new Date(
            `${currentYearMonth.year}-${String(
              currentYearMonth.month + 1
            ).padStart(2, '0')}-01`
          ).getTime() - 1
        );

    const queryExpenses = realm
      .objects(Expense)
      .filtered('date >= $0 && date < $1', startDate, endDate);

    setExpenses(queryExpenses);
  }, [realm, pickedDate, currentYearMonth]);

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
          curYear={currentYearMonth.year}
          curMonth={currentYearMonth.month}
          onPickDateInCalendar={handlePickDateInCalendar}
          onChangeMonthInCalendar={handleChangeInCalendar}
        />

        {expenses && expenses.length > 0 ? (
          <FlatList
            flex={1}
            width="full"
            padding={2}
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
