/* React */
import React, { useCallback, useEffect, useState, memo } from 'react';
/* Native base */
import { HStack, Button, Icon, Text, useColorModeValue } from 'native-base';
/* Realm */
import { BSON } from 'realm';

/* DB */
import { useRealm } from '../../models/realm';
import Category from '../../models/categorySchema';
/* Components */
import CustomIcon from '../../atoms/CustomIcon';
import CategoriesModal from './CategoriesModal';

/* //////////////////////////////////////////////////////////////// */
type Props = {
  categoryId: BSON.ObjectId | null;
  onPickCategory: (pickedCategoryId: BSON.ObjectId) => void;
};

function CategoryPicker({ categoryId, onPickCategory }: Props) {
  const placeholderTextOpacity = useColorModeValue(0.4, 0.2);

  const realm = useRealm();

  const [showCategoriesModal, setShowCategoriesModal] =
    useState<boolean>(false);
  const [pickedCategory, setPickedCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (!categoryId) return;

    const foundCategory = realm.objectForPrimaryKey(Category, categoryId);

    if (foundCategory) setPickedCategory(foundCategory);
  }, [realm, categoryId]);

  /* Event handler ------------------------------------------------ */
  const handleShowCategoriesModal = useCallback(() => {
    setShowCategoriesModal(true);
  }, []);

  const handleHideCategoriesModal = useCallback(() => {
    setShowCategoriesModal(false);
  }, []);

  /* JSX ---------------------------------------------------------- */
  return (
    <>
      <CategoriesModal
        isOpen={showCategoriesModal}
        onClose={handleHideCategoriesModal}
        onPickCategory={onPickCategory}
      />

      <Button
        onPress={handleShowCategoriesModal}
        variant="unstyled"
        width="full"
        justifyContent="flex-start"
        android_ripple={{
          color: useColorModeValue('rippleLightMode', 'rippleDarkMode'),
        }}
      >
        <HStack alignItems="center">
          <Icon as={CustomIcon} name="archive" size="lg" marginRight={5} />
          {pickedCategory ? (
            <Text fontSize="lg">{pickedCategory.categoryName}</Text>
          ) : (
            <Text
              fontSize="lg"
              fontWeight="md"
              opacity={placeholderTextOpacity}
            >
              Pick Category
            </Text>
          )}
        </HStack>
      </Button>
    </>
  );
}

const MemoedCategoryPicker = memo(CategoryPicker);

export default MemoedCategoryPicker;
