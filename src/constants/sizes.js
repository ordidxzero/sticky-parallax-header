import { Platform } from 'react-native';
import { ifIphoneX } from '../utils';
import constants, { TABBED_HEADER_IPHONE_X_HEIGHT, TABBED_HEADER_HEIGHT } from './constants';

export default {
  toolbarHeight: 100,
  headerHeight: ifIphoneX(TABBED_HEADER_IPHONE_X_HEIGHT, TABBED_HEADER_HEIGHT),
  cardScreenHeaderHeight: Platform.select({ ios: ifIphoneX(95, 85), android: 100 }),
  userModalHeaderHeight: ifIphoneX(100, 75),
  homeScreenParallaxHeader: ifIphoneX(
    constants.responsiveHeight(38),
    constants.responsiveHeight(48)
  ),
  cardScreenParallaxHeader: ifIphoneX(
    constants.responsiveHeight(43),
    constants.responsiveHeight(53)
  ),
  userScreenParallaxHeader: ifIphoneX(
    constants.responsiveHeight(43),
    constants.responsiveHeight(53)
  ),
  hitSlop: {
    top: 15,
    left: 15,
    bottom: 15,
    right: 15,
  },
};
