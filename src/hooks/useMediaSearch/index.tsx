import React from 'react';

/**
 * useMediaQuery - Custom hook responsible to fetch data according query param provided by channels.
 */

import { AxiosResponse } from 'axios';
import { getSearchMedia, getMedia } from '../../utils';

import { MediaItem, RequestStatusEnum, ServiceRequest, MediaType } from '../types';
import useLoadingHandler, { Loadable } from '../useLoadingHandler';
import { mapServerResponseToMediaType } from '../useMediaQuery/utils';
import { MediaServerResponse } from '../';

export interface UseMediaSearchProps extends Loadable {
  selectedMediaType: MediaType;
}

interface UseMediaSearchResult {
  data?: MediaItem[];
  searchValue: string;
  hasError: boolean;
  reload: () => void;
  onSearchValueChange: (value: string) => void;
  onLoadMore: () => void;
}

const useMediaSearch = ({
  selectedMediaType,
  onLoadingStart,
  onLoadingDone,
}: UseMediaSearchProps): UseMediaSearchResult => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [{ status, data }, setRequestStatus] = React.useState<ServiceRequest<MediaItem[]>>({
    status: RequestStatusEnum.Waiting,
  });
  const [apiPage, setApiPage] = React.useState(1);

  React.useEffect(() => {
    async function fetchMedia(): Promise<void> {
      if (searchValue.length === 0 || searchValue.length >= 3) {
        try {
          const isNewRequest = apiPage === 1;
          let response: AxiosResponse<MediaServerResponse | undefined>;
          setRequestStatus((prevState) => {
            return {
              data: isNewRequest ? undefined : prevState.data,
              status: RequestStatusEnum.InProgress,
            };
          });

          if (searchValue.length === 0) {
            response = await getMedia({ mediaType: selectedMediaType, apiPage });
          } else {
            response = await getSearchMedia(searchValue, selectedMediaType, apiPage);
          }

          if (response.data) {
            const mappedResponse = mapServerResponseToMediaType(response.data);
            setRequestStatus((prevState) => {
              return {
                status: RequestStatusEnum.Success,
                data:
                  apiPage > 1 && prevState.data && prevState.data?.length > 0
                    ? prevState.data.concat(mappedResponse)
                    : mappedResponse,
              };
            });
          } else {
            setRequestStatus({ status: RequestStatusEnum.Error });
          }
        } catch {
          setRequestStatus({ status: RequestStatusEnum.Error });
        }
      }
    }
    fetchMedia();
  }, [searchValue, apiPage]);

  const onSearchValueChange = (value: string): void => {
    if (status !== RequestStatusEnum.InProgress) {
      setApiPage(1);
      setSearchValue(value);
    }
  };

  const onLoadMore = () => {
    setApiPage((prevState) => prevState + 1);
  };

  const reload = () => {
    setRequestStatus({ status: RequestStatusEnum.Waiting });
    setSearchValue('');
  };

  useLoadingHandler({
    loading: status === RequestStatusEnum.InProgress,
    onLoadingDone,
    onLoadingStart,
  });

  return {
    data,
    searchValue,
    onSearchValueChange,
    hasError: status === RequestStatusEnum.Error,
    reload,
    onLoadMore,
  };
};

export default useMediaSearch;
