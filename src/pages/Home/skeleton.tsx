import React from 'react';

import {
  FeaturedCardShimmer,
  ShimmerMainContainer,
  ShimmerSecondaryContainer,
  ItemCardShimmer,
} from './skeleton.styles';
import Skeleton from '../../components/Skeleton';

interface HomePageSkeletonProps {
  isLoading: boolean;
  children: JSX.Element;
}

export const HomePageSkeleton = ({ isLoading, children }: HomePageSkeletonProps): JSX.Element => {
  return isLoading ? (
    <ShimmerMainContainer>
      <Skeleton style={FeaturedCardShimmer} plain />
      <ShimmerSecondaryContainer>
        <Skeleton style={ItemCardShimmer} plain />
        <Skeleton style={ItemCardShimmer} plain />
        <Skeleton style={ItemCardShimmer} plain />
      </ShimmerSecondaryContainer>
    </ShimmerMainContainer>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
};

export default HomePageSkeleton;
