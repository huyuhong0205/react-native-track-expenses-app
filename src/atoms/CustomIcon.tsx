/* Expo */
import { createIconSetFromIcoMoon } from '@expo/vector-icons';

/* //////////////////////////////////////////////////////////////// */
const CustomIcon = createIconSetFromIcoMoon(
  require('../assets/selection.json'),
  'IcoMoon',
  'icomoon.ttf'
);

export default CustomIcon;
