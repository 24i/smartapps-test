import axios, { AxiosResponse } from 'axios';
import { MediaServerResponse } from '../hooks/types/server.types';

export const fetchData = async (url: string): Promise<AxiosResponse<MediaServerResponse | undefined>> => {
  return await axios.get(url);
};
