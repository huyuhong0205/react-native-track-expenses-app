/* React */
import React from 'react';
/* Native base */
import { Modal, VStack, HStack, Text, useColorModeValue } from 'native-base';

/* Components */
import CustomButton from '../atoms/CustomButton';

/* //////////////////////////////////////////////////////////////// */
type Props = {
  onConfirm: () => void;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmActionText: string;
};

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmActionText,
}: Props) {
  /* JSX ---------------------------------------------------------- */
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <VStack
        space="sm"
        width="360px"
        padding="12px"
        borderRadius="lg"
        shadow="5"
        bgColor={useColorModeValue('bgLightMode', 'bgDarkMode')}
      >
        <Text fontSize="lg" fontWeight="medium">
          {title}
        </Text>
        <Text fontSize="md">{description}</Text>
        <HStack space="sm" marginLeft="auto">
          <CustomButton onPress={onClose}>Cancel</CustomButton>
          <CustomButton onPress={onConfirm} color="error.500">
            {confirmActionText}
          </CustomButton>
        </HStack>
      </VStack>
    </Modal>
  );
}
