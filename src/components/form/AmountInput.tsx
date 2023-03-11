/* React */
import React, { useState, memo } from 'react';
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

function AmountInput({
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
          isOpen
          onClose={() => setIsCalculatorOpen(false)}
          onPressOK={onAmountChange}
        />
      )}

      <HStack space="xs" width="full" alignItems="center" paddingX={3}>
        <Icon as={CustomIcon} name="money" size="lg" />

        <Input
          value={amount}
          placeholder="0"
          onChangeText={onAmountChange}
          keyboardType="decimal-pad"
          variant="unstyled"
          width={180}
          fontSize="2xl"
        />

        <HStack space="xs" marginLeft="auto" marginRight="auto">
          <IconButton
            onPress={onToggleIsExpense}
            icon={
              <Icon
                as={CustomIcon}
                name={isExpense ? 'remove_circle' : 'add_circle'}
                size="3xl"
                color={isExpense ? 'red.500' : 'green.500'}
              />
            }
            variant="unstyled"
          />

          <IconButton
            onPress={() => setIsCalculatorOpen(true)}
            icon={
              <Icon
                as={CustomIcon}
                name="calculate"
                size="3xl"
                color="primary.500"
              />
            }
            variant="unstyled"
            borderRadius="full"
            _pressed={{ opacity: 0.7 }}
          />
        </HStack>
      </HStack>
    </>
  );
}

const MemoedAmountInput = memo(AmountInput);

export default MemoedAmountInput;
