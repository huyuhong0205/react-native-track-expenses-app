/* React */
import React, { useCallback, useState } from 'react';
/* Native base */
import { VStack } from 'native-base';

/* Components */
import StackNavbar from '../components/navigator/StackNavbar';
import DateTimePicker from '../components/form/DateTimePicker';

/* //////////////////////////////////////////////////////////////// */
export default function ExpenseFormScreen() {
  const [date, setDate] = useState<Date>(new Date());

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
        <DateTimePicker date={date} onSelectDate={handleSelectDate} />
      </VStack>
    </>
  );
}
