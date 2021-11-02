import { Colors, Metrics, scale } from '../../utils/styling';

export const getCarouselDimension = (): { item: number; slider: number } => {
  const sliderWidth = Metrics.screen.width;

  return {
    item: sliderWidth - scale(60),
    slider: sliderWidth,
  };
};

export const CarouselDotStyle = {
  width: scale(10),
  height: scale(10),
  borderRadius: scale(5),
  marginHorizontal: scale(8),
  backgroundColor: Colors.decoration,
};

export const CarouselInactiveDotStyle = {
  width: scale(10),
  height: scale(10),
  borderRadius: scale(5),
  marginHorizontal: scale(8),
  backgroundColor: Colors.text,
};
