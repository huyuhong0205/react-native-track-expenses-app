/* React */
import React from 'react';
/* Native base */
import { Modal, VStack, HStack, Text, useColorModeValue } from 'native-base';

/* Components */
import CategoryIcon from './CategoryIcon';

const iconNames: string[] = ['', 'clock', 'title'];

/* //////////////////////////////////////////////////////////////// */
type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelectIcon: (chooseIconName: string) => void;
};

export default function CategoriesIconModal({
  isOpen,
  onClose,
  onSelectIcon,
}: Props) {
  /* JSX ---------------------------------------------------------- */
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <VStack
        space="md"
        alignItems="center"
        height="300px"
        width="300px"
        padding={3}
        borderRadius="xl"
        shadow="5"
        overflow="hidden"
        bgColor={useColorModeValue('bgLightMode', 'bgDarkMode')}
      >
        <Text
          fontSize="md"
          fontWeight="bold"
          textAlign="center"
          textTransform="uppercase"
        >
          Choose Icon
        </Text>

        <HStack space="md">
          {iconNames.map((iconName) => (
            <CategoryIcon
              key={iconName}
              name={iconName}
              onPress={() => {
                onSelectIcon(iconName);
                onClose();
              }}
            />
          ))}
        </HStack>
      </VStack>
    </Modal>
  );
}
