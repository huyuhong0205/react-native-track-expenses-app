/* React */
import React, { useCallback } from 'react';
/* Native base */
import { HStack, Box, Text, IconButton, Icon } from 'native-base';
/* Realm */
import { BSON } from 'realm';

/* Components */
import CustomIcon from '../../atoms/CustomIcon';
import CategoryIcon from './CategoryIcon';
import CategoryForm from './CategoryForm';

/* //////////////////////////////////////////////////////////////// */
type Props = {
  _id: BSON.ObjectId;
  categoryName: string;
  iconName: string;
  inEditMode: boolean;
  onEditCategory: (categoryId: BSON.ObjectId) => void;
  onCancelEditCategory: () => void;
};

export default function CategoryItem({
  _id,
  categoryName,
  iconName,
  inEditMode,
  onEditCategory,
  onCancelEditCategory,
}: Props) {
  const handleEditCategory = useCallback(() => {
    onEditCategory(_id);
  }, [onEditCategory, _id]);

  /* JSX ---------------------------------------------------------- */
  return inEditMode ? (
    <Box padding={3}>
      <CategoryForm
        onCancel={onCancelEditCategory}
        onConfirm={onCancelEditCategory}
        categoryId={_id}
      />
    </Box>
  ) : (
    <HStack space="sm" alignItems="center" padding={2}>
      <CategoryIcon name={iconName} />
      <Text fontSize="lg" fontWeight="medium">
        {categoryName}
      </Text>

      <HStack space="xs" marginLeft="auto">
        <IconButton
          onPress={handleEditCategory}
          variant="unstyled"
          icon={
            <Icon
              as={CustomIcon}
              name="clock" // [TODO] change to edit icon
              size="xl"
              opacity={0.7}
              _light={{ color: 'textLightMode' }}
              _dark={{ color: 'textDarkMode' }}
            />
          }
        />
        <IconButton
          variant="unstyled"
          icon={
            <Icon as={CustomIcon} name="trash" size="xl" color="error.500" />
          }
        />
      </HStack>
    </HStack>
  );
}
