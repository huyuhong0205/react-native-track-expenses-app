/* React */
import React, { useCallback, useState } from 'react';
/* Native base */
import { VStack, Box, Button, Text } from 'native-base';

/* Components */
import DrawerNavbar from '../components/navigator/DrawerNavbar';
import CategoryForm from '../components/category/CategoryForm';

/* //////////////////////////////////////////////////////////////// */
export default function CategoriesScreen() {
  const [showAddForm, setShowAddFrom] = useState<boolean>(false);

  /* Event handler ------------------------------------------------ */
  const handleShowAddForm = useCallback(() => {
    setShowAddFrom(true);
  }, []);

  const handleHideAddForm = useCallback(() => {
    setShowAddFrom(false);
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
      </VStack>
    </>
  );
}
