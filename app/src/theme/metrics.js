
import { Dimensions, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  screenWidth: width,
  screenHeight: height,
  basePadding: 16,
  baseMargin: 12,
  borderRadius: 12,
  statusBarHeight: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
};
