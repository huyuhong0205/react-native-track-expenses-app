/* React */
import React from 'react';
/* Native base */
import { HStack, Icon, Input } from 'native-base';

/* Components */
import CustomIcon from '../../atoms/CustomIcon';

/* //////////////////////////////////////////////////////////////// */
type Props = {
  title: string;
  onTitleChange: (inputTitle: string) => void;
};

export default function TitleInput({ title, onTitleChange }: Props) {
  /* JSX ---------------------------------------------------------- */
  return (
    <HStack space="xs" width="full" alignItems="center" paddingX={3}>
      <Icon as={CustomIcon} name="title" size="lg" />

      <Input
        value={title}
        placeholder="Title"
        onChangeText={onTitleChange}
        variant="unstyled"
        flex={1}
        fontSize="lg"
      />
    </HStack>
  );
}
