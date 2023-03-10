/* React */
import React, { useCallback, useState } from 'react';
/* Native base */
import {
  VStack,
  HStack,
  Input,
  Button,
  Text,
  useColorModeValue,
} from 'native-base';

/* Components */
import CategoriesIconModal from './CategoriesIconModal';
import CategoryIcon from './CategoryIcon';

/* //////////////////////////////////////////////////////////////// */
type Props = {
  onCancel: () => void;
  onConfirm: () => void;
};

export default function CategoryForm({ onCancel, onConfirm }: Props) {
  const [showIconSelectModal, setShowIconSelectModal] =
    useState<boolean>(false);
  const [iconName, setIconName] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string>('');

  /* Event handler ------------------------------------------------ */
  const handleShowIconSelectModal = useCallback(() => {
    setShowIconSelectModal(true);
  }, []);

  const handleHideIconSelectModal = useCallback(() => {
    setShowIconSelectModal(false);
  }, []);

  const handleIconNameChange = useCallback((chooseIconName: string) => {
    setIconName(chooseIconName);
  }, []);

  const handleCategoryNameChange = useCallback((inputCategoryName: string) => {
    setCategoryName(inputCategoryName);
  }, []);

  const handleConfirm = () => {
    if (categoryName.trim().length === 0) return;

    // [TODO] write database
    // eslint-disable-next-line no-console -- [TEMP]
    console.log('iconName: ', iconName, ', categoryName: ', categoryName);
    onConfirm();
  };

  /* JSX ---------------------------------------------------------- */
  return (
    <>
      {showIconSelectModal && (
        <CategoriesIconModal
          isOpen
          onClose={handleHideIconSelectModal}
          onSelectIcon={handleIconNameChange}
        />
      )}

      <VStack
        space="xs"
        width="full"
        padding={3}
        borderRadius="xl"
        shadow={4}
        _light={{ bgColor: useColorModeValue('bgLightMode', 'bgDarkMode') }}
      >
        <HStack space="sm" alignItems="center">
          <CategoryIcon onPress={handleShowIconSelectModal} name={iconName} />
          <Input
            value={categoryName}
            onChangeText={handleCategoryNameChange}
            placeholder="Category name"
            variant="unstyled"
            flex={1}
            fontSize="lg"
          />
        </HStack>

        <HStack space="xs" alignItems="center" marginLeft="auto">
          <Button
            onPress={onCancel}
            variant="unstyled"
            padding={2}
            android_ripple={{
              color: useColorModeValue('rippleLightMode', 'rippleDarkMode'),
            }}
          >
            <Text fontWeight="medium" opacity={0.7}>
              CANCEL
            </Text>
          </Button>

          <Button
            onPress={handleConfirm}
            variant="unstyled"
            padding={2}
            android_ripple={{
              color: useColorModeValue('rippleLightMode', 'rippleDarkMode'),
            }}
          >
            <Text fontWeight="medium" color="primary.500">
              CONFIRM
            </Text>
          </Button>
        </HStack>
      </VStack>
    </>
  );
}
