/* React */
import React from 'react';
/* Native base */
import { Box, Button, Text, useColorModeValue, ITextProps } from 'native-base';

/* //////////////////////////////////////////////////////////////// */
type Props = ITextProps & {
  children: string;
  onPress: () => void;
};

export default function CustomButton({ children, onPress, ...props }: Props) {
  /* JSX ---------------------------------------------------------- */
  return (
    <Box borderRadius="sm" overflow="hidden">
      <Button
        onPress={onPress}
        variant="unstyled"
        padding={2}
        android_ripple={{
          color: useColorModeValue('rippleLightMode', 'rippleDarkMode'),
        }}
      >
        <Text fontWeight="medium" textTransform="uppercase" {...props}>
          {children}
        </Text>
      </Button>
    </Box>
  );
}
