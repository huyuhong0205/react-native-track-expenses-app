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

/* DB */
import { RealmProvider } from './models/realm';
/* Root component */
import App from './App';
/* Hooks */
import useSetting from './hooks/useSetting';

// Keep the splash screen visible while we fetch resources - [NOTE] need outside functional components
SplashScreen.preventAutoHideAsync();

/* //////////////////////////////////////////////////////////////// */
function AppContainer() {
  const [appIsReady, setAppIsReady] = useState(false);

  const { settingWhenAppStart } = useSetting();

  useEffect(() => {
    async function prepare() {
      try {
        console.log('Starting application...');

        await Promise.all([
          await Font.loadAsync({ IcoMoon: require('./assets/icomoon.ttf') }), // Load icon font
          await settingWhenAppStart(), // Load and set app setting
        ]);

        console.log('Application started.');

        //
      } catch (error) {
        console.warn(error);

        //
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [settingWhenAppStart]);

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
      <App />
    </View>
  );
}

export default function AppWrapper() {
  return (
    <RealmProvider>
      <NativeBaseProvider theme={theme}>
        <AppContainer />
      </NativeBaseProvider>
    </RealmProvider>
  );
}
