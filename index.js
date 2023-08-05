import 'expo-asset';

/* React */
import React from 'react';
/* Expo */
import 'expo-dev-client';
import { registerRootComponent } from 'expo';
/* Realm */
import 'react-native-get-random-values';

/* Root component */
import AppWrapper from './src/AppWrapper';

const App = () => <AppWrapper />;

registerRootComponent(App);
