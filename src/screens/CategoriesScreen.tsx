/* React */
import React, { useCallback, useState } from 'react';
/* Native base */
import { VStack, ScrollView, Box, Button, Text } from 'native-base';
/* Realm */
import { BSON } from 'realm';

/* DB */
import { useQuery } from '../models/realm';
import Category from '../models/categorySchema';
/* Components */
import DrawerNavbar from '../components/navigator/DrawerNavbar';
import CategoryForm from '../components/category/CategoryForm';
import CategoryItem from '../components/category/CategoryItem';

/* //////////////////////////////////////////////////////////////// */
export default function CategoriesScreen() {
  const categoriesInRealm = useQuery(Category);

  const [showAddForm, setShowAddFrom] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<BSON.ObjectId | null>(
    null
  );

  /* Event handler ------------------------------------------------ */
  const handleShowAddForm = useCallback(() => {
    setEditCategoryId(null);
    setShowAddFrom(true);
  }, []);

  const handleHideAddForm = useCallback(() => {
    setShowAddFrom(false);
  }, []);

  const handleEditCategory = useCallback((categoryId: BSON.ObjectId) => {
    setShowAddFrom(false);
    setEditCategoryId(categoryId);
  }, []);

  const handleCancelEditCategory = useCallback(() => {
    setEditCategoryId(null);
  }, []);

  /* JSX ---------------------------------------------------------- */
  return (
    <>
      <DrawerNavbar title="Categories" />

      <VStack
        space="sm"
        flex={1}
        paddingX={3}
        _light={{ bgColor: 'bgLightMode' }}
        _dark={{ bgColor: 'bgDarkMode' }}
      >
        {showAddForm ? (
          <CategoryForm
            onCancel={handleHideAddForm}
            onConfirm={handleHideAddForm}
          />
        ) : (
          <Box borderRadius="xl" overflow="hidden">
            <Button
              onPress={handleShowAddForm}
              variant="unstyled"
              borderRadius="xl"
              bgColor="primary.600"
              android_ripple={{
                color: 'rippleLightMode',
              }}
            >
              <Text fontSize="lg" color="textDarkMode">
                + Add
              </Text>
            </Button>
          </Box>
        )}

        <ScrollView flex={1} marginBottom={3}>
          <VStack space="sm">
            {categoriesInRealm.length !== 0 ? (
              categoriesInRealm
                .sorted('_id', true)
                .map(({ _id, categoryName, iconName }) => (
                  <CategoryItem
                    key={String(_id)}
                    _id={_id}
                    categoryName={categoryName}
                    iconName={iconName}
                    inEditMode={String(editCategoryId) === String(_id)}
                    onEditCategory={handleEditCategory}
                    onCancelCategoryEditMode={handleCancelEditCategory}
                  />
                ))
            ) : (
              <Text marginY={3} fontSize="xl" textAlign="center">
                You don't have any categories.
              </Text>
            )}
          </VStack>
        </ScrollView>
      </VStack>
    </>
  );
}
