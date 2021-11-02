import { GenreTitleEnum } from '../hooks/types/channels.types';
import { GenreIdEnum } from '../hooks/types/server.types';

/**
 * Current media genres supported by our app.
 */
export const mediaCategories = [
  { label: GenreTitleEnum.Documentary, id: GenreIdEnum.Documentary },
  { label: GenreTitleEnum.Family, id: GenreIdEnum.Family },
];

/**
 * Mocked video to be used in our video component
 */
export const MOCKED_VIDEO_URL = 'https://rawgit.com/mediaelement/mediaelement-files/master/big_buck_bunny.mp4';

/**
 * Default image URL if an item has an empty or undefined url
 */
export const IMAGE_URL = 'https://image.tmdb.org/t/p/original';
