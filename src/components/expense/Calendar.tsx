/* React */
import React, { useMemo, useState } from 'react';
/* Native base */
import { Box, useColorMode, useColorModeValue } from 'native-base';
/* Calendar */
import { Calendar as RNCalendar, DateData } from 'react-native-calendars';
/* Date fns */
import { format } from 'date-fns';

/* DB */
import { useRealm } from '../../models/realm';
import Expense from '../../models/expenseSchema';

/* //////////////////////////////////////////////////////////////// */
type Props = {
  isFocused: boolean;
  curYear: number;
  curMonth: number;
  onPickDateInCalendar: (selectedDate: string) => void;
  onChangeMonthInCalendar: (year: number, month: number) => void;
};

export default function Calendar({
  isFocused,
  curYear,
  curMonth,
  onPickDateInCalendar,
  onChangeMonthInCalendar,
}: Props) {
  const { colorMode } = useColorMode();

  const realm = useRealm();

  const [currentSelectDate, setCurrentSelectDate] = useState<string>('');

  const expenseMarkers = useMemo(() => {
    const markers: Record<string, { marked: true }> = {};

    if (!isFocused) return markers;

    const expenses = realm
      .objects(Expense)
      .filtered(
        'date >= $0 && date < $1',
        new Date(`${curYear}-${String(curMonth).padStart(2, '0')}-01`),
        new Date(
          new Date(
            `${curYear}-${String(curMonth + 1).padStart(2, '0')}-01`
          ).getTime() - 1
        )
      );

    if (!expenses) return {};

    expenses.forEach((expense) => {
      const expenseDate = format(expense.date, 'yyyy-MM-dd');

      if (!markers[expenseDate]) markers[expenseDate] = { marked: true };
    });

    return markers;
  }, [realm, curYear, curMonth, isFocused]);

  /* Event handler ------------------------------------------------ */
  const handlePressDay = ({ dateString }: DateData) => {
    setCurrentSelectDate((prevDate) => {
      const selectedDate = prevDate === dateString ? '' : dateString;
      onPickDateInCalendar(selectedDate);
      return selectedDate;
    });
  };

  const handleChangeMonth = ({ year, month }: DateData) => {
    onChangeMonthInCalendar(year, month);
  };

  /* JSX ---------------------------------------------------------- */
  return (
    <Box height="380px" width="full" padding={2}>
      <RNCalendar
        onDayPress={handlePressDay}
        onMonthChange={handleChangeMonth}
        markedDates={{
          ...expenseMarkers,
          [currentSelectDate]: {
            selected: true,
            selectedColor: '#3b82f6',
            ...(expenseMarkers[currentSelectDate] ? { marked: true } : {}),
          },
        }}
        style={{
          width: '100%',
        }}
        key={colorMode} // [NOTE] when colorMode change rerender calendar
        theme={{
          calendarBackground: 'transparent',
          monthTextColor: useColorModeValue('#171717', '#ffffff'),
          dayTextColor: useColorModeValue('#171717', '#ffffff'),
          textDisabledColor: useColorModeValue('#17171788', '#ffffff88'),
          arrowColor: '#3b82f6',
          dotColor: '#3b82f6',
          todayTextColor: '#3b82f6',
        }}
      />
    </Box>
  );
}
