import React from 'react';

import { Title, RatingText, CustomGradientContainer, FeaturedTag, Button } from './styles';
import { MediaItem } from '../../hooks/types/channels.types';
import ProgressiveBackgroundImage from '../ProgressiveImage';
import { scale } from '../../utils/styling';
import { useNavigation } from '@react-navigation/native';
import { AppStackEnum, RootStackParamList } from '../../routes/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface FeaturedCardProps {
  item: MediaItem;
}

const FeaturedCard = ({ item }: FeaturedCardProps): JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Button
      onPress={(): void =>
        navigation.navigate(AppStackEnum.DetailsPage as any, { item: item } as unknown as AppStackEnum)
      }
    >
      <ProgressiveBackgroundImage
        source={item.backdropImageUrl ? item.backdropImageUrl : undefined}
        height={scale(200)}
      >
        <FeaturedTag>Popular</FeaturedTag>
        <CustomGradientContainer>
          <Title>{item.title}</Title>
          {item.rate && <RatingText>Rating: {item.rate}</RatingText>}
        </CustomGradientContainer>
      </ProgressiveBackgroundImage>
    </Button>
  );
};

export default FeaturedCard;
