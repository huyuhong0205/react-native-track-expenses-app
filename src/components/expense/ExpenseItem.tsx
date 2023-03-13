/* React */
import React, { memo } from 'react';
/* Navigation */
import {
  useNavigation,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
/* Native base */
import { HStack, VStack, Button, Text, useColorModeValue } from 'native-base';
/* Date fns */
import { format } from 'date-fns';

/* Components */
import CategoryIcon from '../category/CategoryIcon';
/* Types */
import { TDrawerParamList, TStackParamList } from '../../types/TypeNavigator';

type NavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<TDrawerParamList>,
  StackNavigationProp<TStackParamList>
>;

/* //////////////////////////////////////////////////////////////// */
type Props = {
  _id: string;
  title: string;
  amount: number;
  isExpense: boolean;
  date: Date;
  iconName: string;
};

function ExpenseItem({ _id, title, amount, isExpense, date, iconName }: Props) {
  const { navigate } = useNavigation<NavigationProp>();

  /* Event handler ------------------------------------------------ */
  const handleGoExpenseFormScreen = () => {
    navigate('expense_form_screen', { expenseId: String(_id) });
  };

  /* JSX ---------------------------------------------------------- */
  return (
    <Button
      onPress={handleGoExpenseFormScreen}
      variant="unstyled"
      padding={0}
      android_ripple={{
        color: useColorModeValue('rippleLightMode', 'rippleDarkMode'),
      }}
    >
      <HStack space="sm" alignItems="center" width="full" padding={2}>
        <CategoryIcon name={iconName} />
        <Text width="220" fontSize="lg" numberOfLines={1}>
          {title}
        </Text>

        <VStack justifyContent="center" alignItems="flex-end" marginLeft="auto">
          <Text
            fontSize="lg"
            fontWeight="medium"
            color={isExpense ? 'red.500' : 'green.500'}
          >
            {isExpense ? '-' : ''}
            {amount}
          </Text>

          <Text fontSize="sm" opacity={0.9}>
            {format(date, 'MMMM dd yyyy')}
          </Text>
        </VStack>
      </HStack>
    </Button>
  );
}

const MemoedExpenseItem = memo(ExpenseItem);

export default MemoedExpenseItem;
