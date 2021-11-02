import { ViewStyle } from 'react-native';
import { scale, Metrics } from '../../utils/styling';
import styled from 'styled-components/native';

export const ShimmerMainContainer = styled.View`
  flex: 1;
  margin-horizontal: ${scale(20)}px;
`;

export const FeaturedCardShimmer: ViewStyle = {
  width: '100%',
  height: scale(200),
  borderRadius: Metrics.base.radius,
  marginVertical: scale(40),
};

export const ShimmerSecondaryContainer = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: ${scale(20)}px;
`;

export const ItemCardShimmer: ViewStyle = {
  width: Metrics.screen.width * 0.3,
  height: scale(200),
  borderRadius: Metrics.base.radius,
  marginRight: scale(20),
};
