/* Expo */
import { MaterialCommunityIcons } from '@expo/vector-icons';
/* React */
import React from 'react';
/* Native base */
import { Button, Icon, useColorModeValue, IButtonProps } from 'native-base';

/* //////////////////////////////////////////////////////////////// */
type Props = IButtonProps & {
  children: string;
  active: boolean;
  icon: string;
};

export default function MenuButton({
  children,
  active,
  icon,
  ...props
}: Props) {
  /* JSX ---------------------------------------------------------- */
  return (
    <Button
      _light={{ bgColor: active ? '#00000010' : 'transparent' }}
      _dark={{ bgColor: active ? '#ffffff10' : 'transparent' }}
      _text={{ color: useColorModeValue('textLightMode', 'textDarkMode') }}
      justifyContent="flex-start"
      alignItems="center"
      variant="solid"
      leftIcon={
        <Icon
          as={MaterialCommunityIcons}
          name={icon}
          color={useColorModeValue('textLightMode', 'textDarkMode')}
          size="md"
        />
      }
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Button>
  );
}
