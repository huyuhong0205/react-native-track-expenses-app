/* React */
import React, { useState, memo } from 'react';
/* Native base */
import { Box, useColorModeValue } from 'native-base';
/* Calendar */
import { Calendar as RNCalendar, DateData } from 'react-native-calendars';

/* //////////////////////////////////////////////////////////////// */
type Props = {
  onPickDateInCalendar: (selectedDate: string) => void;
  onChangeMonthInCalendar: (year: number, month: number) => void;
};

function Calendar({ onPickDateInCalendar, onChangeMonthInCalendar }: Props) {
  const [currentSelectDate, setCurrentSelectDate] = useState<string>('');

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
    <Box width="full" padding={2}>
      <RNCalendar
        onDayPress={handlePressDay}
        onMonthChange={handleChangeMonth}
        markedDates={{
          [currentSelectDate]: { selected: true, selectedColor: '#3b82f6' },
        }}
        style={{
          width: '100%',
        }}
        theme={{
          backgroundColor: useColorModeValue('bgLightMode', 'bgDarkMode'),
          calendarBackground: useColorModeValue('bgLightMode', 'bgDarkMode'),
        }}
      />
    </Box>
  );
}

const MemoedCalendar = memo(Calendar);

export default MemoedCalendar;
