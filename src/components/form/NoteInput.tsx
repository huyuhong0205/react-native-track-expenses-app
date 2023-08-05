/* React */
import React from 'react';
/* Native base */
import { HStack, Icon, Input } from 'native-base';

/* Components */
import CustomIcon from '../../atoms/CustomIcon';

/* //////////////////////////////////////////////////////////////// */
type Props = {
  note: string;
  onNoteChange: (inputNote: string) => void;
};

export default function NoteInput({ note, onNoteChange }: Props) {
  /* JSX ---------------------------------------------------------- */
  return (
    <HStack space="xs" width="full" paddingX={3}>
      <Icon as={CustomIcon} name="file-text" size="lg" marginTop={2.5} />

      <Input
        value={note}
        placeholder="Note"
        multiline
        numberOfLines={7}
        textAlignVertical="top"
        onChangeText={onNoteChange}
        variant="unstyled"
        flex={1}
        fontSize="lg"
      />
    </HStack>
  );
}
