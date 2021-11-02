/**
 * Server Types
 */

export enum GenreIdEnum {
  /* Common */
  Western = 37,
  Animation = 16,
  Comedy = 35,
  Documentary = 99,
  Drama = 18,
  Family = 10751,
  Action = 28,
  Adventure = 12,
  /* Movies */
  Crime = 80,
  Fantasy = 14,
  History = 36,
  Horror = 27,
  Music = 10402,
  Mystery = 9648,
  Romance = 10749,
  Science_Fiction = 878,
  TV_Movie = 10770,
  Thriller = 53,
  War = 10752,
  /* Tv Series*/
  Kids = 10762,
  Action_Adventure = 10759,
  SciFi_Fantasy = 10765,
  Soap = 10766,
  Talk = 10767,
  War_Politics = 10768,
  Mistery = 9648,
  News = 10763,
  Reality = 10764,
}

export interface MediaTypeServer {
  id: number;
  poster_path: string | null;
  adult?: boolean;
  overview: string;
  release_date?: string;
  genre_ids: GenreIdEnum[];
  original_title?: string;
  original_language: string;
  title?: string;
  name?: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video?: boolean;
  vote_average: number;
  first_air_date?: string;
  origin_country?: string[];
  original_name?: string;
}

export interface MediaServerResponse {
  page: number;
  results: MediaTypeServer[];
  total_results: number;
  total_pages: number;
}
