import { MediaItem, MediaType, GenreIdEnum } from '../hooks';

export enum AppStackEnum {
  Home = 'Home',
  DetailsPage = 'DetailsPage',
  SearchPage = 'SearchPage',
  MediaByGenrePage = 'MediaByGenrePage ',
}

export type RootStackParamList = {
  [AppStackEnum.Home]: undefined;
  [AppStackEnum.DetailsPage]: { item: MediaItem };
  [AppStackEnum.SearchPage]: { selectedMediaType: MediaType };
  [AppStackEnum.MediaByGenrePage]: { selectedMediaType: MediaType; genre: GenreIdEnum };
};
