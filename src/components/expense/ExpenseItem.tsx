/* React */
import React, { memo } from 'react';
/* Native base */
import { HStack, VStack, Button, Text, useColorModeValue } from 'native-base';
/* Date fns */
import { format } from 'date-fns';

/* DB */
import Expense from '../../models/expenseSchema';
/* Components */
import CategoryIcon from '../category/CategoryIcon';

/* //////////////////////////////////////////////////////////////// */
type Props = {
  expense: Expense;
  iconName: string;
};

function ExpenseItem({ expense, iconName }: Props) {
  /* JSX ---------------------------------------------------------- */
  return (
    <Button
      variant="unstyled"
      padding={0}
      android_ripple={{
        color: useColorModeValue('rippleLightMode', 'rippleDarkMode'),
      }}
    >
      <HStack space="sm" alignItems="center" width="full" padding={2}>
        <CategoryIcon name={iconName} />
        <Text width="220" fontSize="lg" numberOfLines={1}>
          {expense.title}
        </Text>

        <VStack justifyContent="center" alignItems="flex-end" marginLeft="auto">
          <Text
            fontSize="lg"
            fontWeight="medium"
            color={expense.isExpense ? 'red.500' : 'green.500'}
          >
            {expense.isExpense ? '-' : ''}
            {expense.amount}
          </Text>

          <Text fontSize="sm" opacity={0.9}>
            {format(expense.date, 'MMMM dd yyyy')}
          </Text>
        </VStack>
      </HStack>
    </Button>
  );
}

const MemoedExpenseItem = memo(ExpenseItem);

export default MemoedExpenseItem;
