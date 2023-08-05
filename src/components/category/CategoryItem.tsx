/* React */
import React, { useCallback, useState, memo } from 'react';
/* Native base */
import { HStack, Box, Text, IconButton, Icon } from 'native-base';
/* Realm */
import { BSON } from 'realm';

/* DB */
import { useRealm } from '../../models/realm';
import Category from '../../models/categorySchema';
import Expense from '../../models/expenseSchema';
/* Components */
import CustomIcon from '../../atoms/CustomIcon';
import ConfirmDialog from '../ConfirmDialog';
import CategoryForm from './CategoryForm';
import CategoryIcon from './CategoryIcon';

/* //////////////////////////////////////////////////////////////// */
type Props = {
  _id: BSON.ObjectId;
  categoryName: string;
  iconName: string;
  inEditMode: boolean;
  onEditCategory: (categoryId: BSON.ObjectId) => void;
  onCancelCategoryEditMode: () => void;
};

function CategoryItem({
  _id,
  categoryName,
  iconName,
  inEditMode,
  onEditCategory,
  onCancelCategoryEditMode,
}: Props) {
  const realm = useRealm();

  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

  /* Event handler ------------------------------------------------ */
  const handleShowConfirmDialog = useCallback(() => {
    setShowConfirmDialog(true);
  }, []);

  const handleHideConfirmDialog = useCallback(() => {
    setShowConfirmDialog(false);
  }, []);

  const handleSwitchToEditMode = useCallback(() => {
    onEditCategory(_id);
  }, [onEditCategory, _id]);

  const handleDeleteCategory = useCallback(() => {
    const category = realm.objectForPrimaryKey(Category, _id);
    const expenses = realm.objects(Expense).filtered('categoryId == $0', _id);

    if (!category) return;

    realm.write(() => {
      realm.delete(expenses);
      realm.delete(category);
    });
  }, [realm, _id]);

  /* JSX ---------------------------------------------------------- */
  return inEditMode ? (
    <Box padding={3}>
      <CategoryForm
        onCancel={onCancelCategoryEditMode}
        onConfirm={onCancelCategoryEditMode}
        categoryId={_id}
      />
    </Box>
  ) : (
    <>
      <ConfirmDialog
        onConfirm={handleDeleteCategory}
        isOpen={showConfirmDialog}
        onClose={handleHideConfirmDialog}
        title="Delete Category?"
        description="If you delete this category, all expense belong this category will be removed."
        confirmActionText="Delete"
      />

      <HStack space="sm" alignItems="center" padding={2}>
        <CategoryIcon name={iconName} />
        <Text fontSize="lg" fontWeight="medium">
          {categoryName}
        </Text>

        <HStack space="xs" marginLeft="auto">
          <IconButton
            onPress={handleSwitchToEditMode}
            variant="unstyled"
            icon={
              <Icon
                as={CustomIcon}
                name="edit"
                size="xl"
                opacity={0.7}
                _light={{ color: 'textLightMode' }}
                _dark={{ color: 'textDarkMode' }}
              />
            }
            _pressed={{ opacity: 0.7 }}
          />
          <IconButton
            onPress={handleShowConfirmDialog}
            variant="unstyled"
            icon={
              <Icon as={CustomIcon} name="trash" size="xl" color="error.500" />
            }
            _pressed={{ opacity: 0.7 }}
          />
        </HStack>
      </HStack>
    </>
  );
}

const MemoedCategoryItem = memo(CategoryItem);

export default MemoedCategoryItem;
