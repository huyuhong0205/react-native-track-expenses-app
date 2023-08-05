/* React */
import React, { useCallback } from 'react';
/* Navigation */
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
/* Native base */
import { HStack, Box, Text, IconButton, useColorModeValue } from 'native-base';

/* Components */
import CustomIcon from '../../atoms/CustomIcon';
/* Types */
import { TStackParamList } from '../../types/TypeNavigator';

/* //////////////////////////////////////////////////////////////// */
type Props = {
  children?: React.ReactNode;
  title: string;
};

StackNavbar.defaultProps = {
  children: null,
};

export default function StackNavbar({ children, title }: Props) {
  const { goBack } = useNavigation<StackNavigationProp<TStackParamList>>();

  /* Event handler ------------------------------------------------ */
  const handlePressGoBackButton = useCallback(() => {
    goBack();
  }, [goBack]);

  /* JSX ---------------------------------------------------------- */
  return (
    <HStack
      safeArea
      alignItems="center"
      height="80px"
      width="full"
      paddingY="5px"
      paddingX="10px"
      _light={{ bgColor: 'bgLightMode' }}
      _dark={{ bgColor: 'bgDarkMode' }}
    >
      <IconButton
        onPress={handlePressGoBackButton}
        borderRadius="full"
        _icon={{
          as: CustomIcon,
          name: 'arrow-left',
          size: 22,
          color: useColorModeValue('#171717', '#ffffff'),
        }}
        _pressed={{ bgColor: 'transparent' }}
      />
      <Text marginLeft={5} marginRight="auto" fontSize="lg">
        {title}
      </Text>

      {children !== null && (
        <Box
          justifyContent="center"
          alignItems="center"
          height="full"
          marginRight="10px"
        >
          {children}
        </Box>
      )}
    </HStack>
  );
}
