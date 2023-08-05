/* React */
import React from 'react';
/* Native base */
import { Modal, VStack, HStack, Text, useColorModeValue } from 'native-base';

/* Components */
import CategoryIcon from './CategoryIcon';

const iconNames: string[] = [
  '',
  'atm',
  'bathtub',
  'child_care',
  'directions_car',
  'directions_walk',
  'emoji_people',
  'fastfood',
  'fitness_center',
  'flight_takeoff',
  'gamepad',
  'laptop_chromebook',
  'local_grocery_store',
  'menu_book',
  'nightlife',
  'phone_enabled',
  'sports_bar',
  'sports_soccer',
];

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
        // height="300px"
        // width="300px"
        padding={8}
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

        <VStack space="md">
          {[0, 1, 2, 3].map((num) => (
            <HStack key={`icon-row-${num}`} space="md">
              {iconNames.slice(num * 4, num * 4 + 4).map((iconName) => (
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
          ))}
        </VStack>
      </VStack>
    </Modal>
  );
}
