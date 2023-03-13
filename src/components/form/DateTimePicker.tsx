/* React */
import React, { useCallback, memo } from 'react';
/* Native base */
import { HStack, Text, Button, Icon, useColorModeValue } from 'native-base';
/* DateTimePicker */
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
/* Date fns */
import { format } from 'date-fns';

/* Components */
import CustomIcon from '../../atoms/CustomIcon';

/* //////////////////////////////////////////////////////////////// */
type Props = {
  date: Date;
  onSelectDate: (selectedDate: Date) => void;
};

function DateTimePicker({ date, onSelectDate }: Props) {
  /* Event handler ------------------------------------------------ */
  const handleDateChange = useCallback(
    (_: DateTimePickerEvent, selectedDate: Date) => {
      const currentDate = selectedDate || new Date();
      onSelectDate(currentDate);
    },
    [onSelectDate]
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

  /* JSX ---------------------------------------------------------- */
  return (
    <HStack
      space="xl"
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
          <Icon as={CustomIcon} name="calendar" size="lg" marginRight={5} />
          <Text fontSize="lg">{format(date, 'yyyy/MM/dd')}</Text>
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
          <Icon as={CustomIcon} name="clock" size="lg" marginRight={5} />
          <Text fontSize="lg">{format(date, 'HH:mm')}</Text>
        </HStack>
      </Button>
    </HStack>
  );
}

const MemoedDateTimePicker = memo(DateTimePicker);

export default MemoedDateTimePicker;
