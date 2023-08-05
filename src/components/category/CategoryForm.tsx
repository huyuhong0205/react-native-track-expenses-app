/* React */
import React, { useCallback, useEffect, useState } from 'react';
/* Native base */
import { VStack, HStack, Input } from 'native-base';
/* Realm */
import { BSON } from 'realm';

/* DB */
import { useRealm } from '../../models/realm';
import Category from '../../models/categorySchema';
/* Components */
import CustomButton from '../../atoms/CustomButton';
import CategoriesIconModal from './CategoriesIconModal';
import CategoryIcon from './CategoryIcon';

/* //////////////////////////////////////////////////////////////// */
type Props = {
  onCancel: () => void;
  onConfirm: () => void;
  categoryId?: BSON.ObjectId;
};

CategoryForm.defaultProps = {
  categoryId: undefined,
};

export default function CategoryForm({
  onCancel,
  onConfirm,
  categoryId,
}: Props) {
  const realm = useRealm();

  const [showIconSelectModal, setShowIconSelectModal] =
    useState<boolean>(false);
  const [iconName, setIconName] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string>('');

  useEffect(() => {
    if (!categoryId) return;

    const category = realm.objectForPrimaryKey(Category, categoryId);

    if (!category) return;

    setIconName(category.iconName);
    setCategoryName(category.categoryName);
  }, [realm, categoryId]);

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

    if (!categoryId) {
      realm.write(() => {
        const newCategory = new Category(realm, categoryName, iconName);
        return newCategory;
      });
    } else {
      realm.write(() => {
        const category = realm.objectForPrimaryKey(Category, categoryId);
        category.iconName = iconName;
        category.categoryName = categoryName;
      });
    }

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
        _light={{ bgColor: 'bgLightMode', shadow: 4 }}
        _dark={{ bgColor: 'bgDarkMode', shadow: 9 }}
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
          <CustomButton onPress={onCancel}>Cancel</CustomButton>
          <CustomButton onPress={handleConfirm} color="primary.500">
            Confirm
          </CustomButton>
        </HStack>
      </VStack>
    </>
  );
}
