/* React */
import React from 'react';
/* Native base */
import {
  Modal,
  VStack,
  ScrollView,
  Box,
  Text,
  useColorModeValue,
} from 'native-base';
/* Realm */
import { BSON } from 'realm';

/* DB */
import { useQuery } from '../../models/realm';
import Category from '../../models/categorySchema';
/* Components */
import CategoriesModalItem from './CategoriesModalItem';

/* //////////////////////////////////////////////////////////////// */
type Props = {
  isOpen: boolean;
  onClose: () => void;
  onPickCategory: (pickedCategoryId: BSON.ObjectId) => void;
};

export default function CategoriesModal({
  isOpen,
  onClose,
  onPickCategory,
}: Props) {
  const categoriesInRealm = useQuery(Category);

  /* JSX ---------------------------------------------------------- */
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Box
        height="300px"
        width="350px"
        padding={3}
        borderRadius="xl"
        shadow="5"
        bgColor={useColorModeValue('bgLightMode', 'bgDarkMode')}
      >
        {categoriesInRealm.length === 0 ? (
          <Text marginY="auto" fontSize="xl" textAlign="center">
            You don't have any categories. Please create one.
          </Text>
        ) : (
          <ScrollView>
            <VStack>
              {categoriesInRealm
                .sorted('_id', true)
                .map(({ _id, categoryName, iconName }) => (
                  <CategoriesModalItem
                    key={String(_id)}
                    categoryName={categoryName}
                    iconName={iconName}
                    onPress={() => {
                      onPickCategory(_id);
                      onClose();
                    }}
                  />
                ))}
            </VStack>
          </ScrollView>
        )}
      </Box>
    </Modal>
  );
}
