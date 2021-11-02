import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Title, Button, CardImage, TextContainer, CardImageContainer } from './styles';
import { MediaItem } from '../../hooks';
import { AppStackEnum, RootStackParamList } from '../../routes/types';
import { Colors, scale } from '../../utils';
import { ActivityIndicator } from 'react-native';
import { DefaultPlaceHolder } from '../../../assets';
import { RatingComponent } from '..';

interface MediaItemListProps {
  item: MediaItem;
}

const MediaItemListCard = ({ item }: MediaItemListProps): JSX.Element => {
  const [isImageLoading, setImageLoading] = React.useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, AppStackEnum.DetailsPage>>();
  const imageSource = item.backdropImageUrl;
  return (
    <Button
      onPress={(): void =>
        navigation.navigate(AppStackEnum.DetailsPage as any, { item: item } as unknown as AppStackEnum)
      }
    >
      <CardImageContainer>
        <CardImage
          source={imageSource ? { uri: imageSource } : DefaultPlaceHolder}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
        />
        {isImageLoading && (
          <ActivityIndicator
            color={Colors.decoration}
            size={'small'}
            style={{ position: 'absolute', top: scale(20), alignSelf: 'center' }}
          />
        )}
      </CardImageContainer>
      <TextContainer>
        <Title>{item.title}</Title>
        <RatingComponent rate={item.rate} />
      </TextContainer>
    </Button>
  );
};

export default MediaItemListCard;
