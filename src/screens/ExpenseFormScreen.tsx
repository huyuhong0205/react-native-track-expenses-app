/* React */
import React, { useCallback, useState } from 'react';
/* Native base */
import { VStack } from 'native-base';

/* Components */
import StackNavbar from '../components/navigator/StackNavbar';
import AmountInput from '../components/form/AmountInput';
import DateTimePicker from '../components/form/DateTimePicker';

/* //////////////////////////////////////////////////////////////// */
export default function ExpenseFormScreen() {
  const [amount, setAmount] = useState<string>('0');
  const [isExpense, setIsExpense] = useState<boolean>(true);
  const [date, setDate] = useState<Date>(new Date());

  /* Event handler ------------------------------------------------ */
  const handleAmountChange = useCallback((inputAmount: string) => {
    setAmount(inputAmount);
  }, []);

  const handleToggleIsExpense = useCallback(() => {
    setIsExpense((prevState) => !prevState);
  }, []);

  const handleSelectDate = useCallback((selectedDate: Date) => {
    setDate(selectedDate);
  }, []);

  /* JSX ---------------------------------------------------------- */
  return (
    <>
      <StackNavbar title="Add new expense" />

      <VStack
        flex={1}
        alignItems="center"
        _light={{ bgColor: 'bgLightMode' }}
        _dark={{ bgColor: 'bgDarkMode' }}
      >
        <AmountInput
          amount={amount}
          onAmountChange={handleAmountChange}
          isExpense={isExpense}
          onToggleIsExpense={handleToggleIsExpense}
        />
        <DateTimePicker date={date} onSelectDate={handleSelectDate} />
      </VStack>
    </>
  );
}
