/* React */
import React, { useState } from 'react';
/* Native base */
import { HStack, IconButton, Icon, Input } from 'native-base';

/* Components */
import CustomIcon from '../../atoms/CustomIcon';
import Calculator from './Calculator';

/* //////////////////////////////////////////////////////////////// */
type Props = {
  amount: string;
  onAmountChange: (inputAmount: string) => void;
  isExpense: boolean;
  onToggleIsExpense: () => void;
};

export default function AmountInput({
  amount,
  onAmountChange,
  isExpense,
  onToggleIsExpense,
}: Props) {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);

  /* JSX ---------------------------------------------------------- */
  return (
    <>
      {isCalculatorOpen && (
        <Calculator
          isOpen={isCalculatorOpen}
          onClose={() => setIsCalculatorOpen(false)}
          onPressOK={onAmountChange}
        />
      )}

      <HStack space={2} width="full" alignItems="center">
        <Icon as={CustomIcon} name="clock" size={6} marginLeft={3} />

        <Input
          value={amount}
          placeholder="0.0"
          onChangeText={onAmountChange}
          keyboardType="decimal-pad"
          variant="unstyled"
          width={180}
          fontSize="2xl"
        />

        <HStack space={2} marginLeft="auto" marginRight="auto">
          <IconButton
            onPress={onToggleIsExpense}
            icon={
              <Icon
                as={CustomIcon}
                name={isExpense ? 'clock' : 'calendar'}
                size={8}
                color={isExpense ? 'red.500' : 'green.500'}
              />
            }
            variant="unstyled"
          />

          <IconButton
            onPress={() => setIsCalculatorOpen(true)}
            icon={
              <Icon as={CustomIcon} name="clock" size={8} color="primary.500" />
            }
            variant="unstyled"
          />
        </HStack>
      </HStack>
    </>
  );
}
