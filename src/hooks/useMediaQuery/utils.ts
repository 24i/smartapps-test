import { MediaServerResponse, MediaItem } from '../types';
import { IMAGE_URL } from '../../utils';

export const mapServerResponseToMediaType = (data: MediaServerResponse): MediaItem[] => {
  const mappedData: MediaItem[] = [];

  for (let item of data.results) {
    mappedData.push({
      id: item.id,
      title: item.title || item.name || '',
      backdropImageUrl: item.backdrop_path ? IMAGE_URL + item.backdrop_path : '',
      posterImageUrl: item.poster_path ? IMAGE_URL + item.poster_path : '',
      genres: item.genre_ids,
      rate: item.vote_average,
      description: item.overview,
    });
  }

  return mappedData;
};
