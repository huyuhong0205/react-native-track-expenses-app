/* React */
import React from 'react';
/* Native base */
import {
  Modal,
  VStack,
  HStack,
  Box,
  Text,
  Icon,
  useColorModeValue,
} from 'native-base';

/* Components */
import CustomIcon from '../../atoms/CustomIcon';
import CalculatorCell from './CalculatorCell';
/* Hooks */
import useCalculator from '../../hooks/useCalculator';
/* Utils */
import { evaluate } from '../../utils/evaluate';

const rowHeight = '72px';

/* //////////////////////////////////////////////////////////////// */
type Props = {
  isOpen: boolean;
  onClose: () => void;
  onPressOK: (inputAmount: string) => void;
};

export default function Calculator({ isOpen, onClose, onPressOK }: Props) {
  const {
    prevOperand,
    currentOperand,
    operation,
    addDigit0,
    addDigit1,
    addDigit2,
    addDigit3,
    addDigit4,
    addDigit5,
    addDigit6,
    addDigit7,
    addDigit8,
    addDigit9,
    addDigitDot,
    chooseOperationDivide,
    chooseOperationMultiple,
    chooseOperationMinus,
    chooseOperationPlus,
    clear,
    deleteDigit,
  } = useCalculator();

  /* Event handler ------------------------------------------------ */
  const handlePressOK = () => {
    const result = evaluate(prevOperand, currentOperand, operation);

    onPressOK(result);
    onClose();
  };

  /* JSX ---------------------------------------------------------- */
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <VStack
        // height={500}
        width={332}
        borderRadius="xl"
        shadow="5"
        overflow="hidden"
        bgColor={useColorModeValue('bgLightMode', 'bgDarkMode')}
      >
        <HStack height="150px">
          <Box
            flex={1}
            padding={2}
            bgColor={useColorModeValue('primary.50', 'primary.700')}
          >
            <Text fontSize="3xl">
              {prevOperand} {operation}
            </Text>
            <Text marginTop="auto" marginLeft="auto" fontSize="5xl">
              {currentOperand}
            </Text>
          </Box>
        </HStack>

        <HStack height={rowHeight}>
          <CalculatorCell onPress={addDigit7}>7</CalculatorCell>
          <CalculatorCell onPress={addDigit8}>8</CalculatorCell>
          <CalculatorCell onPress={addDigit9}>9</CalculatorCell>
          <CalculatorCell onPress={chooseOperationDivide}>/</CalculatorCell>
        </HStack>

        <HStack height={rowHeight}>
          <CalculatorCell onPress={addDigit4}>4</CalculatorCell>
          <CalculatorCell onPress={addDigit5}>5</CalculatorCell>
          <CalculatorCell onPress={addDigit6}>6</CalculatorCell>
          <CalculatorCell onPress={chooseOperationMultiple}>*</CalculatorCell>
        </HStack>

        <HStack height={rowHeight}>
          <CalculatorCell onPress={addDigit1}>1</CalculatorCell>
          <CalculatorCell onPress={addDigit2}>2</CalculatorCell>
          <CalculatorCell onPress={addDigit3}>3</CalculatorCell>
          <CalculatorCell onPress={chooseOperationMinus}>-</CalculatorCell>
        </HStack>

        <HStack height={rowHeight}>
          <CalculatorCell onPress={addDigitDot}>.</CalculatorCell>
          <CalculatorCell onPress={addDigit0}>0</CalculatorCell>
          <CalculatorCell onPress={deleteDigit}>
            <Icon
              as={CustomIcon}
              name="delete"
              size="2xl"
              color={useColorModeValue('textLightMode', 'textDarkMode')}
            />
          </CalculatorCell>
          <CalculatorCell onPress={chooseOperationPlus}>+</CalculatorCell>
        </HStack>

        <HStack height={rowHeight}>
          <CalculatorCell onPress={clear}>AC</CalculatorCell>
          <CalculatorCell onPress={handlePressOK}>OK</CalculatorCell>
        </HStack>
      </VStack>
    </Modal>
  );
}
