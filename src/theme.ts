import { extendTheme } from 'native-base';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};

const colors = {
  bgLightMode: '#fafafa', // muted.50
  bgDarkMode: '#262626', // muted.800

  textLightMode: '#171717', // native base default
  textDarkMode: '#ffffff', // native base default

  rippleLightMode: '#00000010',
  rippleDarkMode: '#ffffff10',

  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
};

const theme = extendTheme({ config, colors });

export default theme;
