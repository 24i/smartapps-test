import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const heightScale = height / 812;
export const widthScale = width / 375;

/**
 * Scale function that will allow to make our app response to different screen sizes.
 * @param size
 * @param heightBased
 */
export const scale = (size: number, heightBased?: boolean): number =>
  heightBased ? size * heightScale : size * widthScale;

/**
 * Default metrics for our app to be used in styles
 */
export const Metrics = {
  screen: {
    width: width < height ? width : height,
    height: width < height ? height : width,
    isLandscape: width >= height,
  },
  base: {
    margin: scale(20),
    padding: scale(20),
    radius: scale(5),
  },
  button: {
    padding: scale(10),
  },
  text: {
    h1: scale(24),
    h2: scale(18),
    p1: scale(14),
  },
};

/**
 * Default colors for our app to be used in styles
 */
export const Colors = {
  background: '#264653',
  backgroundSecondary: '#457b9d',
  backgroundTertiary: '#14232a',
  images: '#E9C46A',
  text: '#f7ede2',
  textSecondary: '#2A9D8F',
  textAlert: '#e76f51',
  decoration: '#e9c46a',
  black: '#000000',
  shimmer: {
    primary: '#3d4046',
    secondary: '#3d4046',
    tertiary: '#3d4046',
  },
  videoProgressBar: {
    minimumTrackTintColor: '#F44336',
    maximumTrackTintColor: '#FFFFFF',
    thumbTintColor: '#F44336',
  },
};
