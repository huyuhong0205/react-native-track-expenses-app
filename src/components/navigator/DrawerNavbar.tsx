/* React */
import React, { useCallback } from 'react';
/* Navigation */
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
/* Native base */
import { HStack, Text, IconButton, useColorModeValue } from 'native-base';

/* Components */
import CustomIcon from '../../atoms/CustomIcon';
/* Types */
import { TDrawerParamList } from '../../types/TypeNavigator';

/* //////////////////////////////////////////////////////////////// */
type Props = {
  title: string;
};

export default function DrawerNavbar({ title }: Props) {
  const { openDrawer } =
    useNavigation<DrawerNavigationProp<TDrawerParamList>>();

  /* Event handler ------------------------------------------------ */
  const handlePressMenuButton = useCallback(() => {
    openDrawer();
  }, [openDrawer]);

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
        onPress={handlePressMenuButton}
        borderRadius="full"
        _icon={{
          as: CustomIcon,
          name: 'menu',
          size: '22px',
          color: useColorModeValue('#171717', '#ffffff'),
        }}
        _pressed={{ bgColor: 'transparent' }}
      />
      <Text marginLeft={5} marginRight="auto" fontSize="lg">
        {title}
      </Text>
    </HStack>
  );
}
