// React
import React from 'react';
// Native base
import { Box, Text } from 'native-base';

// Components
import DrawerNavbar from '../components/Navigator/DrawerNavbar';

///////////////////////////////////////////////////////////////////
export default function CategoriesScreen() {
  // JSX ----------------------------------------------------------
  return (
    <>
      <DrawerNavbar title="Categories" />

      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        _light={{ bgColor: 'bgLightMode' }}
        _dark={{ bgColor: 'bgDarkMode' }}
      >
        <Text>Categories Screen</Text>
      </Box>
    </>
  );
}
