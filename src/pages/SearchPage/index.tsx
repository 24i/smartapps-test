import React from 'react';

import { SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { HeaderContainer, Button, BackImage, Input, InputStyleViewStyle, CloseImage } from './styles';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { Colors, scale, keyGenerator } from '../../utils';
import { MediaType, MediaItem, useMediaSearch } from '../../hooks';
import { ErrorComponent, MediaItemListCard } from '../../components';

interface SearchPageProps {
  route: RouteProp<{ params: { selectedMediaType: MediaType } }, 'params'>;
}

const SearchPage = ({ route }: SearchPageProps): JSX.Element => {
  const { selectedMediaType } = route.params;
  const [hasScrolled, setHasScrolled] = React.useState<boolean>(false);

  const [isLoading, setLoading] = React.useState<boolean>(false);
  const navigation = useNavigation();

  const { data, searchValue, hasError, reload, onSearchValueChange, onLoadMore } = useMediaSearch({
    selectedMediaType,
    onLoadingStart: () => setLoading(true),
    onLoadingDone: () => setLoading(false),
  });

  const handleLoadMore = () => {
    if (hasScrolled) {
      onLoadMore();
    }
  };

  return (
    <SafeAreaView>
      <HeaderContainer>
        <Button onPress={() => navigation.goBack()}>
          <BackImage />
        </Button>
        <Input
          placeholder={'Searching for...'}
          style={InputStyleViewStyle}
          onChangeText={(text) => onSearchValueChange(text)}
          value={searchValue}
          autoFocus={true}
        />
        {searchValue.length > 0 && !isLoading && (
          <Button onPress={() => onSearchValueChange('')}>
            <CloseImage />
          </Button>
        )}
        {isLoading && <ActivityIndicator color={Colors.decoration} />}
      </HeaderContainer>
      {hasError ? (
        <ErrorComponent onReload={reload} />
      ) : (
        <FlatList
          data={data || []}
          renderItem={({ item }: { item: MediaItem }): JSX.Element => <MediaItemListCard item={item} />}
          keyExtractor={(item) => keyGenerator(item.id.toString())}
          showsVerticalScrollIndicator={false}
          alwaysBounceHorizontal={false}
          onScroll={(): void => setHasScrolled(true)}
          onEndReached={(): void => handleLoadMore()}
          contentContainerStyle={{ paddingBottom: scale(60) }}
        />
      )}
      {isLoading && <ActivityIndicator color={Colors.decoration} />}
    </SafeAreaView>
  );
};

export default SearchPage;
