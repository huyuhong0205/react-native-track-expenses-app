/* eslint-disable @typescript-eslint/no-use-before-define */

/* Expo */
import { StatusBar } from 'expo-status-bar';
/* React */
import React from 'react';
/* Navigation */
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
/* Native base */
import { useColorModeValue } from 'native-base';

/* Screens */
import ExpensesScreen from './screens/ExpensesScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import ExpenseFormScreen from './screens/ExpenseFormScreen';
/* Components */
import DrawerSidebar from './components/navigator/DrawerSidebar';
/* Types */
import { TDrawerParamList, TStackParamList } from './types/TypeNavigator';

const Drawer = createDrawerNavigator<TDrawerParamList>();
const Stack = createStackNavigator<TStackParamList>();

const bgLightMode = '#fafafa';
const bgDarkMode = '#262626';

/* //////////////////////////////////////////////////////////////// */
export default function App() {
  return (
    <>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style={useColorModeValue('dark', 'light')} />

      <NavigationContainer
        // [NOTE] fix background color flash when switching between screen: https://stackoverflow.com/questions/59900898/white-background-flashing-when-switching-screens-react-navigation-v5
        theme={{
          colors: {
            primary: undefined,
            card: undefined,
            text: undefined,
            border: undefined,
            notification: undefined,
            background: useColorModeValue(bgLightMode, bgDarkMode),
          },
          dark: undefined,
        }}
      >
        <StackNavigator />
      </NavigationContainer>
    </>
  );
}

/* //////////////////////////////////////////////////////////////// */
function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="drawer_navigator"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: useColorModeValue(bgLightMode, bgDarkMode),
        },
        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
      }}
    >
      <Stack.Screen name="expense_form_screen" component={ExpenseFormScreen} />
      <Stack.Screen name="drawer_navigator" component={DrawerNavigator} />
    </Stack.Navigator>
  );
}

/* //////////////////////////////////////////////////////////////// */
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="expenses_screen"
      // eslint-disable-next-line react/jsx-props-no-spreading, react/no-unstable-nested-components
      drawerContent={(props) => <DrawerSidebar {...props} />}
      screenOptions={{
        swipeEdgeWidth: 100,
        headerShown: false,
        drawerType: 'back',
        overlayColor: 'transparent',
      }}
    >
      <Drawer.Screen name="expenses_screen" component={ExpensesScreen} />
      <Drawer.Screen name="categories_screen" component={CategoriesScreen} />
    </Drawer.Navigator>
  );
}
