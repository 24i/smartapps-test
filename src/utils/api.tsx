import { AxiosResponse } from 'axios';

import Config from 'react-native-config';

import { MediaType, GenreIdEnum, MediaServerResponse } from '../hooks';
import { fetchData } from './network';

/**
 * Function to get media according media type
 * @param mediaType - possible media type TvShows or Movies
 * @param genres - optional param to filter by genres
 * @param apiPage - optional param to get specific api page
 */
export const getMedia = ({
  mediaType,
  genres,
  apiPage = 1,
}: {
  mediaType: MediaType;
  genres?: GenreIdEnum[];
  apiPage?: number;
}): Promise<AxiosResponse<MediaServerResponse | undefined>> => {
  const genresQueryParam = genres ? `&with_genres=${genres.toString()}` : '';
  const endpoint = `${Config.API_URL}/discover/${mediaType}?api_key=${Config.API_KEY}${genresQueryParam}&page=${apiPage}`;

  return fetchData(endpoint);
};

/**
 * Function to get popular media according media type
 * @param mediaType
 */
export const getPopularMedia = (mediaType: MediaType): Promise<AxiosResponse<MediaServerResponse | undefined>> => {
  const endpoint = `${Config.API_URL}/${mediaType}/popular?api_key=${Config.API_KEY}`;

  return fetchData(endpoint);
};

/**
 * Function to get media filtered according a search query param
 * @param query
 * @param mediaType
 */
export const getSearchMedia = (
  query: string,
  mediaType: MediaType,
  page?: number
): Promise<AxiosResponse<MediaServerResponse | undefined>> => {
  const endpoint = `${Config.API_URL}/search/${mediaType}?api_key=${Config.API_KEY}&query=${encodeURI(query)}${
    page ? `&page=${page}` : ''
  }`;

  return fetchData(endpoint);
};
