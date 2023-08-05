/* React */
import React, { memo } from 'react';
/* Native base */
import { Button, Text, useColorModeValue } from 'native-base';

/* //////////////////////////////////////////////////////////////// */
type Props = {
  children: React.ReactNode;
  onPress: () => void;
  flex?: number;
  _bgLight?: string;
  _bgDark?: string;
};

CalculatorCell.defaultProps = {
  flex: 1,
  _bgLight: 'bgLightMode',
  _bgDark: 'bgDarkMode',
};

function CalculatorCell({ children, onPress, flex, _bgLight, _bgDark }: Props) {
  /* JSX ---------------------------------------------------------- */
  return (
    <Button
      onPress={onPress}
      variant="unstyled"
      flex={flex}
      justifyContent="center"
      alignItems="center"
      height="full"
      borderRadius="none"
      bgColor={useColorModeValue(_bgLight, _bgDark)}
      android_ripple={{
        color: useColorModeValue('rippleLightMode', 'rippleDarkMode'),
      }}
    >
      {typeof children === 'string' ? (
        <Text fontSize={30} fontWeight="medium">
          {children}
        </Text>
      ) : (
        children
      )}
    </Button>
  );
}

const MemoedCalculatorCell = memo(CalculatorCell);

export default MemoedCalculatorCell;
