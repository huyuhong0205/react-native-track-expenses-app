/* React */
import React from 'react';
/* Native base */
import { Modal, VStack, HStack, Text, useColorModeValue } from 'native-base';

/* Components */
import CustomButton from '../atoms/CustomButton';

/* //////////////////////////////////////////////////////////////// */
type Props = {
  isOpen: boolean;
  onClose: () => void;
  description: string;
};

export default function AlertDialog({ isOpen, onClose, description }: Props) {
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
        <Text fontSize="md">{description}</Text>
        <HStack space="sm" marginLeft="auto">
          <CustomButton onPress={onClose}>ok</CustomButton>
        </HStack>
      </VStack>
    </Modal>
  );
}
