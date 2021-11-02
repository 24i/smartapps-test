import * as React from 'react';

import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  Container,
  HeaderContainer,
  SearchImage,
  Button,
  AppTitle,
  MenuContainer,
  MediaTypeOption,
  Scroll,
} from './styles';

import HomePageSkeleton from './skeleton';
import { CategoryCarousel, PopularItemsCarousel, ErrorComponent } from '../../components';
import { MediaType, useMediaLogic } from '../../hooks';
import { AppStackEnum, RootStackParamList } from '../../routes/types';
import { mediaCategories } from '../../utils';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, AppStackEnum.DetailsPage>;

const HomePage = (): JSX.Element => {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [selectedMediaType, setSelectedMediaType] = React.useState<MediaType>(MediaType.TvShows);

  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { data, hasError, reload } = useMediaLogic({
    selectedMediaType,
    onLoadingStart: () => setLoading(true),
    onLoadingDone: () => setLoading(false),
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <HeaderContainer>
          <AppTitle>MediaLand</AppTitle>
          <Button
            onPress={(): void =>
              navigation.navigate(AppStackEnum.SearchPage as any, { selectedMediaType } as unknown as AppStackEnum)
            }
          >
            <SearchImage />
          </Button>
        </HeaderContainer>
        <HomePageSkeleton isLoading={isLoading}>
          {hasError ? (
            <ErrorComponent onReload={reload} />
          ) : (
            <>
              <MenuContainer>
                <Button
                  isSelected={selectedMediaType === MediaType.TvShows}
                  onPress={(): void => setSelectedMediaType(MediaType.TvShows)}
                >
                  <MediaTypeOption isSelected={selectedMediaType === MediaType.TvShows}>TV Shows</MediaTypeOption>
                </Button>
                <Button
                  isSelected={selectedMediaType === MediaType.Movies}
                  onPress={(): void => setSelectedMediaType(MediaType.Movies)}
                >
                  <MediaTypeOption isSelected={selectedMediaType === MediaType.Movies}>Movies</MediaTypeOption>
                </Button>
              </MenuContainer>
              <Scroll>
                {(data.popularItems && data.popularItems.length > 0 && (
                  <PopularItemsCarousel items={data.popularItems.slice(0, 5)} />
                )) || <React.Fragment />}
                {(data.items &&
                  mediaCategories.map((category) => {
                    const filteredItems = data.items?.filter((item) => item.genres.includes(category.id));
                    return filteredItems && filteredItems.length > 0 ? (
                      <CategoryCarousel
                        key={category.label}
                        category={category.label}
                        items={filteredItems}
                        onMoreNavigation={(): void =>
                          navigation.navigate(
                            AppStackEnum.MediaByGenrePage as any,
                            { selectedMediaType, genre: category.id } as unknown as AppStackEnum
                          )
                        }
                      />
                    ) : (
                      <React.Fragment key={category.label} />
                    );
                  })) || <React.Fragment />}
              </Scroll>
            </>
          )}
        </HomePageSkeleton>
      </Container>
    </SafeAreaView>
  );
};

export default HomePage;
