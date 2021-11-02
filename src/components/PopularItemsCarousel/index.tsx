import React from 'react';

import { MediaItem } from '~/hooks/types/channels.types';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FeaturedCard from '../../components/FeaturedCard';
import { CarouselDotStyle, CarouselInactiveDotStyle, getCarouselDimension } from './styles';

interface PopularItemsCarouselProps {
  items: MediaItem[];
}

const PopularItemsCarousel = ({ items }: PopularItemsCarouselProps): JSX.Element => {
  const [activeItem, setActiveItem] = React.useState<number>(0);

  return (
    <>
      <Carousel
        data={items}
        renderItem={({ item }: { item: MediaItem }): JSX.Element => {
          return <FeaturedCard key={item.id} item={item} />;
        }}
        itemWidth={getCarouselDimension().item}
        sliderWidth={getCarouselDimension().slider}
        onSnapToItem={(index) => setActiveItem(index)}
      />
      <Pagination
        dotsLength={items.length}
        activeDotIndex={activeItem}
        dotStyle={CarouselDotStyle}
        inactiveDotStyle={CarouselInactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </>
  );
};

export default PopularItemsCarousel;
