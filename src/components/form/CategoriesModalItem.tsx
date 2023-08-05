/* React */
import React from 'react';
/* Native base */
import { HStack, Button, Text, useColorModeValue } from 'native-base';

/* Components */
import CategoryIcon from '../category/CategoryIcon';

/* //////////////////////////////////////////////////////////////// */
type Props = {
  categoryName: string;
  iconName: string;
  onPress: () => void;
};

export default function CategoriesModalItem({
  categoryName,
  iconName,
  onPress,
}: Props) {
  /* JSX ---------------------------------------------------------- */
  return (
    <Button
      onPress={onPress}
      variant="unstyled"
      justifyContent="flex-start"
      android_ripple={{
        color: useColorModeValue('rippleLightMode', 'rippleDarkMode'),
      }}
    >
      <HStack space="sm" alignItems="center">
        <CategoryIcon name={iconName} />
        <Text fontSize="lg" fontWeight="medium">
          {categoryName}
        </Text>
      </HStack>
    </Button>
  );
}
