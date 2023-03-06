// Expo
import { Feather } from '@expo/vector-icons';
// React
import React, { useCallback } from 'react';
// Native base
import { HStack, Text, Button, Icon, useColorModeValue } from 'native-base';
// DateTimePicker
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
// Date fns
import { format } from 'date-fns';

///////////////////////////////////////////////////////////////////
type Props = {
  date: Date;
  onSelectDate: (selectedDate: Date) => void;
};

export default function DateTimePicker({
  date,
  onSelectDate: handleSelectDate,
}: Props) {
  // Event handler ------------------------------------------------
  const handleDateChange = useCallback(
    (_: DateTimePickerEvent, selectedDate: Date) => {
      const currentDate = selectedDate || new Date();
      handleSelectDate(currentDate);
    },
    [handleSelectDate]
  );

  const handleShowDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: handleDateChange,
      mode: 'date',
      is24Hour: true,
    });
  };

  const handleShowTimePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: handleDateChange,
      mode: 'time',
      is24Hour: true,
    });
  };

  // JSX ----------------------------------------------------------
  return (
    <HStack
      space={4}
      justifyContent="flex-start"
      alignItems="center"
      width="full"
    >
      <Button
        onPress={handleShowDatePicker}
        variant="unstyled"
        height={10}
        android_ripple={{
          color: useColorModeValue('rippleLightMode', 'rippleDarkMode'),
        }}
      >
        <HStack alignItems="center">
          <Icon as={Feather} name="calendar" size={6} marginRight={2} />
          <Text fontSize={16}>{format(date, 'yyyy/MM/dd')}</Text>
        </HStack>
      </Button>

      <Button
        onPress={handleShowTimePicker}
        variant="unstyled"
        height={10}
        android_ripple={{
          color: useColorModeValue('rippleLightMode', 'rippleDarkMode'),
        }}
      >
        <HStack alignItems="center">
          <Icon as={Feather} name="clock" size={6} marginRight={2} />
          <Text fontSize={16}>{format(date, 'hh:mm')}</Text>
        </HStack>
      </Button>
    </HStack>
  );
}
