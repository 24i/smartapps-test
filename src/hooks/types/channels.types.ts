import { GenreIdEnum } from './server.types';

export enum GenreTitleEnum {
  Family = 'Family',
  Documentary = 'Documentary',
}

export interface MediaItem {
  id: number;
  title: string;
  genres: GenreIdEnum[];
  backdropImageUrl?: string;
  posterImageUrl?: string;
  rate?: number;
  description: string;
}

export enum RequestStatusEnum {
  Waiting = 'waiting',
  InProgress = 'inprogress',
  Success = 'success',
  Error = 'error',
}

export interface ServiceRequest<D> {
  status: RequestStatusEnum;
  data?: D;
}

export enum MediaType {
  TvShows = 'tv',
  Movies = 'movie',
}
