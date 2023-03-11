/* eslint-disable no-console -- [TEMP] */

/* React */
import React, { useCallback, useState } from 'react';
/* Navigation */
import { StackScreenProps } from '@react-navigation/stack';
/* Native base */
import {
  VStack,
  Center,
  Fab,
  IconButton,
  Icon,
  useColorModeValue,
} from 'native-base';
/* Realm */
import { BSON } from 'realm';

/* Components */
import CustomIcon from '../atoms/CustomIcon';
import StackNavbar from '../components/navigator/StackNavbar';
import TitleInput from '../components/form/TitleInput';
import AmountInput from '../components/form/AmountInput';
import DateTimePicker from '../components/form/DateTimePicker';
import CategoryPicker from '../components/form/CategoryPicker';
import NoteInput from '../components/form/NoteInput';
/* Types */
import { TStackParamList } from '../types/TypeNavigator';

/* //////////////////////////////////////////////////////////////// */
type Props = StackScreenProps<TStackParamList, 'expense_form_screen'>;

export default function ExpenseFormScreen({ navigation }: Props) {
  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<string>('0');
  const [isExpense, setIsExpense] = useState<boolean>(true);
  const [date, setDate] = useState<Date>(new Date());
  const [categoryId, setCategoryId] = useState<BSON.ObjectId | null>(null);
  const [note, setNote] = useState<string>('');

  /* Event handler ------------------------------------------------ */
  const handleDelete = () => {
    console.log('delete');
  };

  const handleTitleChange = useCallback((inputTitle: string) => {
    setTitle(inputTitle);
  }, []);

  const handleAmountChange = useCallback((inputAmount: string) => {
    setAmount(inputAmount);
  }, []);

  const handleToggleIsExpense = useCallback(() => {
    setIsExpense((prevState) => !prevState);
  }, []);

  const handleSelectDate = useCallback((selectedDate: Date) => {
    setDate(selectedDate);
  }, []);

  const handlePickCategory = useCallback((pickedCategoryId: BSON.ObjectId) => {
    setCategoryId(pickedCategoryId);
  }, []);

  const handleNoteChange = useCallback((inputNote: string) => {
    setNote(inputNote);
  }, []);

  const handleSubmitForm = () => {
    if (!categoryId) return; // [TODO] show alert

    console.log('title: ', title);
    console.log('amount: ', amount);
    console.log('isExpense: ', isExpense);
    console.log('date: ', date);
    console.log('categoryId: ', categoryId);
    console.log('note: ', note);

    navigation.goBack();
  };

  /* JSX ---------------------------------------------------------- */
  return (
    <>
      <StackNavbar title="Add new expense">
        <Center borderRadius="full" overflow="hidden">
          <IconButton
            onPress={handleDelete}
            icon={
              <Icon
                as={CustomIcon}
                name="trash"
                size="xl"
                color={useColorModeValue('error.500', 'error.500')}
              />
            }
            variant="unstyled"
            android_ripple={{
              color: useColorModeValue('rippleLightMode', 'rippleDarkMode'),
            }}
          />
        </Center>
      </StackNavbar>

      <VStack
        space="xs"
        flex={1}
        alignItems="center"
        _light={{ bgColor: 'bgLightMode' }}
        _dark={{ bgColor: 'bgDarkMode' }}
      >
        <TitleInput title={title} onTitleChange={handleTitleChange} />
        <AmountInput
          amount={amount}
          onAmountChange={handleAmountChange}
          isExpense={isExpense}
          onToggleIsExpense={handleToggleIsExpense}
        />
        <DateTimePicker date={date} onSelectDate={handleSelectDate} />
        <CategoryPicker
          categoryId={categoryId}
          onPickCategory={handlePickCategory}
        />
        <NoteInput note={note} onNoteChange={handleNoteChange} />

        <Fab
          onPress={handleSubmitForm}
          position="absolute"
          bottom="30px"
          right="30px"
          icon={<Icon as={CustomIcon} name="check" size="2xl" />}
        />
      </VStack>
    </>
  );
}
