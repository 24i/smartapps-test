import React from 'react';

/**
 * useMediaByGenre - Custom hook to get data according genre.
 */

import { MediaItem, RequestStatusEnum, ServiceRequest, MediaType } from '../types/channels.types';
import useLoadingHandler, { Loadable } from '../useLoadingHandler';
import { mapServerResponseToMediaType } from '../useMediaQuery/utils';
import { getMedia } from '../../utils';
import { GenreIdEnum } from '../types/server.types';

interface MediaGenreProps extends Loadable {
  selectedMediaType: MediaType;
  selectedGenre: GenreIdEnum;
}

interface MediaGenreResult {
  data?: MediaItem[];
  hasError: boolean;
  reload: () => void;
  onLoadMore: () => void;
}

const useMediaByGenre = ({
  selectedMediaType,
  selectedGenre,
  onLoadingStart,
  onLoadingDone,
}: MediaGenreProps): MediaGenreResult => {
  const [{ status, data }, setRequestStatus] = React.useState<ServiceRequest<MediaItem[]>>({
    status: RequestStatusEnum.Waiting,
  });
  const [apiPage, setApiPage] = React.useState(1);

  React.useEffect(() => {
    async function fetchMedia(): Promise<void> {
      const isNewRequest = apiPage === 1;

      setRequestStatus((prevState) => {
        return {
          data: isNewRequest ? undefined : prevState.data,
          status: RequestStatusEnum.InProgress,
        };
      });

      try {
        const response = await getMedia({ mediaType: selectedMediaType, genres: [selectedGenre], apiPage });

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
    fetchMedia();
  }, [apiPage]);

  const onLoadMore = () => {
    setApiPage((prevState) => prevState + 1);
  };

  const reload = () => {
    setRequestStatus({ status: RequestStatusEnum.Waiting });
    setApiPage(1);
  };

  useLoadingHandler({
    loading: status === RequestStatusEnum.InProgress,
    onLoadingDone,
    onLoadingStart,
  });

  return {
    data,
    hasError: status === RequestStatusEnum.Error,
    reload,
    onLoadMore,
  };
};

export default useMediaByGenre;
