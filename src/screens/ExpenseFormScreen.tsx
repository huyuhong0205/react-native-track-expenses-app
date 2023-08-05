/* React */
import React, { useCallback, useLayoutEffect, useState } from 'react';
/* Navigation */
import { useIsFocused } from '@react-navigation/native';
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

/* DB */
import { useRealm } from '../models/realm';
import Expense from '../models/expenseSchema';
/* Components */
import CustomIcon from '../atoms/CustomIcon';
import AlertDialog from '../components/AlertDialog';
import ConfirmDialog from '../components/ConfirmDialog';
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

export default function ExpenseFormScreen({ navigation, route }: Props) {
  const expenseId = route.params?.expenseId || undefined;

  const isFocused = useIsFocused();

  const realm = useRealm();

  const [showAlertDialog, setShowAlertDialog] = useState<boolean>(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<string>('0');
  const [isExpense, setIsExpense] = useState<boolean>(true);
  const [date, setDate] = useState<Date>(new Date());
  const [categoryId, setCategoryId] = useState<BSON.ObjectId | null>(null);
  const [note, setNote] = useState<string>('');

  // prefill form data if in edit mode
  useLayoutEffect(() => {
    if (!expenseId) return;

    const expenseInRealm = realm.objectForPrimaryKey(
      Expense,
      new BSON.ObjectId(expenseId)
    );

    if (!expenseInRealm) {
      navigation.goBack();
      return;
    }

    setTitle(expenseInRealm.title);
    setAmount(String(expenseInRealm.amount));
    setIsExpense(expenseInRealm.isExpense);
    setDate(expenseInRealm.date);
    setCategoryId(expenseInRealm.categoryId);
    setNote(expenseInRealm.note);
  }, [navigation, realm, expenseId]);

  /* Event handler ------------------------------------------------ */
  const handleShowConfirmDialog = useCallback(() => {
    setShowConfirmDialog(true);
  }, []);

  const handleHideConfirmDialog = useCallback(() => {
    setShowConfirmDialog(false);
  }, []);

  const handleShowAlertDialog = useCallback(() => {
    setShowAlertDialog(true);
  }, []);

  const handleHideAlertDialog = useCallback(() => {
    setShowAlertDialog(false);
  }, []);

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

  const handleDeleteExpense = useCallback(() => {
    const expenseInRealm = realm.objectForPrimaryKey(
      Expense,
      new BSON.ObjectId(expenseId)
    );

    if (!expenseInRealm) return;

    realm.write(() => {
      realm.delete(expenseInRealm);
    });

    setShowConfirmDialog(false);
    navigation.goBack();
  }, [navigation, realm, expenseId]);

  const handleSubmitForm = () => {
    if (Number.isNaN(Number(amount))) return;

    if (!categoryId) {
      handleShowAlertDialog();
      return;
    }

    if (!expenseId) {
      realm.write(() => {
        const newExpense = new Expense(
          realm,
          title.trim(),
          Math.abs(+amount),
          isExpense,
          date,
          categoryId,
          note.trim()
        );
        return newExpense;
      });
    } else {
      realm.write(() => {
        const expenseInRealm = realm.objectForPrimaryKey(
          Expense,
          new BSON.ObjectId(expenseId)
        );
        expenseInRealm.title = title.trim();
        expenseInRealm.amount = Math.abs(+amount);
        expenseInRealm.isExpense = isExpense;
        expenseInRealm.date = date;
        expenseInRealm.categoryId = categoryId;
        expenseInRealm.note = note.trim();
      });
    }

    navigation.goBack();
  };

  /* JSX ---------------------------------------------------------- */
  return (
    <>
      <AlertDialog
        isOpen={showAlertDialog}
        onClose={handleHideAlertDialog}
        description="Please select a category."
      />

      <ConfirmDialog
        onConfirm={handleDeleteExpense}
        isOpen={showConfirmDialog}
        onClose={handleHideConfirmDialog}
        title="Delete Expense?"
        description="Do you want to delete this expense?"
        confirmActionText="Delete"
      />

      <StackNavbar title="Add new expense">
        {expenseId && (
          <Center borderRadius="full" overflow="hidden">
            <IconButton
              onPress={handleShowConfirmDialog}
              icon={
                <Icon
                  as={CustomIcon}
                  name="trash"
                  size="xl"
                  color="error.500"
                />
              }
              variant="unstyled"
              android_ripple={{
                // eslint-disable-next-line react-hooks/rules-of-hooks
                color: useColorModeValue('rippleLightMode', 'rippleDarkMode'),
              }}
            />
          </Center>
        )}
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

        {isFocused && (
          <Fab
            onPress={handleSubmitForm}
            position="absolute"
            bottom="30px"
            right="30px"
            icon={<Icon as={CustomIcon} name="check" size="2xl" />}
          />
        )}
      </VStack>
    </>
  );
}
