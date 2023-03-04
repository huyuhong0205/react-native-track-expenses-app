// React
import React from 'react';
import { View, Text } from 'react-native';
// Expo
import { StatusBar } from 'expo-status-bar';

///////////////////////////////////////////////////////////////////
export default function App() {
  // JSX ----------------------------------------------------------
  return (
    <>
      <StatusBar style="dark" />

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Hello world</Text>
      </View>
    </>
  );
}
