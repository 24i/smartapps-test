import React from 'react';

import {
  CategoryContainer,
  CardContainer,
  CategorySubtitle,
  CategoryTitle,
  CategoryTitleContainer,
  MoreText,
  CategoryTextContainer,
  MoreButton,
} from './styles';
import { MediaItem, GenreTitleEnum } from '../../hooks/types/channels.types';
import { FlatList } from 'react-native';
import ProgressiveBackgroundImage from '../ProgressiveImage';
import { useNavigation } from '@react-navigation/native';
import { AppStackEnum, RootStackParamList } from '../../routes/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface CategoryCarouselProps {
  category: GenreTitleEnum;
  items: MediaItem[];
  onMoreNavigation: () => void;
}

const CategoryCarousel = ({ items, category, onMoreNavigation }: CategoryCarouselProps): JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, AppStackEnum.DetailsPage>>();
  const renderItemCard = (item: MediaItem, index: number): JSX.Element => {
    return (
      <CardContainer
        isFirstItem={index === 0}
        key={item.id}
        onPress={(): void =>
          navigation.navigate(AppStackEnum.DetailsPage as any, { item: item } as unknown as AppStackEnum)
        }
      >
        <ProgressiveBackgroundImage source={item.posterImageUrl ? item.posterImageUrl : undefined} />
      </CardContainer>
    );
  };

  return (
    <CategoryContainer>
      <CategoryTitleContainer>
        <CategoryTextContainer>
          <CategoryTitle>{category}</CategoryTitle>
          <CategorySubtitle>This is amazing.</CategorySubtitle>
        </CategoryTextContainer>
        <MoreButton onPress={onMoreNavigation}>
          <MoreText>More</MoreText>
        </MoreButton>
      </CategoryTitleContainer>
      <FlatList
        data={items}
        renderItem={({ item, index }: { item: MediaItem; index: number }): JSX.Element => renderItemCard(item, index)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={false}
      />
    </CategoryContainer>
  );
};

export default CategoryCarousel;
