// Expo
import { Feather } from '@expo/vector-icons';
// React
import React, { useCallback } from 'react';
// Navigation
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// Native base
import { HStack, Text, IconButton, useColorModeValue } from 'native-base';

// Types
import { TStackParamList } from '../../types/TypeNavigator';

///////////////////////////////////////////////////////////////////
type Props = {
  title: string;
};

export default function StackNavbar({ title }: Props) {
  const { goBack } = useNavigation<StackNavigationProp<TStackParamList>>();

  // Event handler ------------------------------------------------
  const handlePressGoBackButton = useCallback(() => {
    goBack();
  }, [goBack]);

  // JSX ----------------------------------------------------------
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
          as: Feather,
          name: 'arrow-left',
          size: '22px',
          color: useColorModeValue('#171717', '#ffffff'),
        }}
        _pressed={{ bgColor: 'transparent' }}
      />
      <Text marginLeft={5} marginRight="auto" fontSize="lg">
        {title}
      </Text>

      {/* [TODO] header right buttons */}
    </HStack>
  );
}
