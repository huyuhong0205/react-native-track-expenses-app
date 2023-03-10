/* React */
import React from 'react';
/* Native base */
import { Button, Icon } from 'native-base';

/* Components */
import CustomIcon from '../../atoms/CustomIcon';

/* //////////////////////////////////////////////////////////////// */
type Props = {
  onPress?: () => void;
  name: string;
};

CategoryIcon.defaultProps = {
  onPress: undefined,
};

export default function CategoryIcon({ onPress, name }: Props) {
  /* JSX ---------------------------------------------------------- */
  return (
    <Button
      onPress={onPress}
      variant="unstyled"
      justifyContent="center"
      alignItems="center"
      height="43px"
      width="43px"
      borderRadius="full"
      bgColor="primary.500"
    >
      {name.length !== 0 && (
        <Icon
          as={CustomIcon}
          name={name}
          size="2xl"
          color="textDarkMode"
          opacity={0.95}
        />
      )}
    </Button>
  );
}
