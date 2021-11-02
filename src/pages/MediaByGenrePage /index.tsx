import React from 'react';

import { SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { HeaderContainer, Button, BackImage, PageTile } from './styles';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { MediaItemListCard, ErrorComponent } from '../../components';
import { GenreIdEnum, useMediaByGenre, MediaType, MediaItem } from '../../hooks';
import { mediaCategories, Colors, scale, keyGenerator } from '../../utils';

interface SearchPageProps {
  route: RouteProp<{ params: { selectedMediaType: MediaType; genre: GenreIdEnum } }, 'params'>;
}

const MediaByGenrePage = ({ route }: SearchPageProps): JSX.Element => {
  const navigation = useNavigation();
  const { selectedMediaType, genre } = route.params;

  const [hasScrolled, setHasScrolled] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const { data, reload, hasError, onLoadMore } = useMediaByGenre({
    selectedMediaType,
    selectedGenre: genre,
    onLoadingStart: () => setLoading(true),
    onLoadingDone: () => setLoading(false),
  });

  const handleLoadMore = (): void => {
    if (hasScrolled) {
      onLoadMore();
    }
  };

  const genreTitle = mediaCategories.find((item) => item.id === genre)?.label || '';

  return (
    <SafeAreaView>
      <HeaderContainer>
        <Button onPress={() => navigation.goBack()}>
          <BackImage />
        </Button>
        <PageTile>{genreTitle}</PageTile>
      </HeaderContainer>
      {hasError ? (
        <ErrorComponent onReload={reload} />
      ) : (
        <FlatList
          data={data || []}
          renderItem={({ item }: { item: MediaItem }): JSX.Element => {
            return <MediaItemListCard item={item} />;
          }}
          keyExtractor={(item) => keyGenerator(item.id.toString())}
          showsVerticalScrollIndicator={false}
          alwaysBounceHorizontal={false}
          onScroll={(): void => setHasScrolled(true)}
          onEndReached={(): void => handleLoadMore()}
          contentContainerStyle={{ paddingBottom: scale(100) }}
          ListFooterComponent={(isLoading && <ActivityIndicator color={Colors.decoration} size="large" />) || null}
        />
      )}
    </SafeAreaView>
  );
};

export default MediaByGenrePage;
