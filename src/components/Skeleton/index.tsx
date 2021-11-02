import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { ViewStyle } from 'react-native';
import { Colors } from '../../utils/styling';

export const SkeletonPlaceHolder = createShimmerPlaceholder(LinearGradient);

const defaultSkeletonProps = {
  LinearGradient: LinearGradient,
  reverse: false,
  autoRun: true,
  isInteraction: false,
  location: [0.3, 0.5, 0.7],
  duration: 1000,
};

export interface SkeletonProps {
  /* Loading state. */
  isLoading?: boolean;
  /* Wrapped JSX.Elements that will be visible if isLoading = false */
  children?: JSX.Element | JSX.Element[];
  /* Skeleton style */
  style?: ViewStyle;
  /**  A Skeleton is plain when it doesnt wrap a JSX.Element and it's part of
   * a complete page Skeleton */
  plain?: boolean;
}

export default function Skeleton({ isLoading, children, style, plain }: SkeletonProps): JSX.Element {
  return isLoading || plain ? (
    <SkeletonPlaceHolder
      {...defaultSkeletonProps}
      visible={plain ? false : !isLoading}
      style={{ ...style, backgroundColor: Colors.shimmer.primary }}
      shimmerColors={[Colors.shimmer.primary, Colors.shimmer.secondary, Colors.shimmer.tertiary]}
    />
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
}
