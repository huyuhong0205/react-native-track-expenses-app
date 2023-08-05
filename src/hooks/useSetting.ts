/* React */
import { useCallback } from 'react';
/* Native base */
import { useColorMode } from 'native-base';
/* Async storage */
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useSetting() {
  const { setColorMode: setNBColorMode } = useColorMode();

  const settingWhenAppStart = useCallback(async () => {
    const colorMode = ((await AsyncStorage.getItem('colorMode')) || 'light') as
      | 'light'
      | 'dark';

    setNBColorMode(colorMode);
  }, [setNBColorMode]);

  const setColorMode = useCallback(async (colorMode: 'light' | 'dark') => {
    try {
      await AsyncStorage.setItem('colorMode', colorMode);
    } catch (_) {
      // unused
    }
  }, []);

  return { settingWhenAppStart, setColorMode };
}
