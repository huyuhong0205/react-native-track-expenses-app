/* eslint-disable no-console */

/* Expo */
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
/* React */
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
/* Native base */
import { NativeBaseProvider } from 'native-base';
import theme from './theme';

/* Root component */
import App from './App';

// Keep the splash screen visible while we fetch resources - [NOTE] need outside functional components
SplashScreen.preventAutoHideAsync();

/* //////////////////////////////////////////////////////////////// */
export default function AppWrapper() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        console.log('waiting for loading assets...');

        // Load icon font
        await Font.loadAsync({ IcoMoon: require('./assets/icomoon.ttf') });

        console.log('assets loaded.');

        //
      } catch (error) {
        console.warn(error);

        //
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  /* Event handler ------------------------------------------------ */
  const handleLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  /* JSX ---------------------------------------------------------- */
  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={handleLayoutRootView} style={{ flex: 1 }}>
      <NativeBaseProvider theme={theme}>
        <App />
      </NativeBaseProvider>
    </View>
  );
}
