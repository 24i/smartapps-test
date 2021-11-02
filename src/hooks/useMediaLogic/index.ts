import React from 'react';

/**
 * useMediaLogic - Custom hook to handle channels logic in dashboard pages,
 * combined with useMediaQuery hook.
 */

import { MediaItem, RequestStatusEnum, MediaType } from '../types/channels.types';
import useMediaQuery from '../useMediaQuery';
import useLoadingHandler, { Loadable } from '../useLoadingHandler';

interface MediaLogicProps extends Loadable {
  selectedMediaType: MediaType;
}

interface MediaLogicResult {
  data: {
    popularItems?: MediaItem[];
    items?: MediaItem[];
  };
  hasError: boolean;
  reload: () => void;
}

const useMediaLogic = ({ selectedMediaType, onLoadingStart, onLoadingDone }: MediaLogicProps): MediaLogicResult => {
  const { data, status, getDashboardMediaData } = useMediaQuery();

  const getData = (): void => {
    getDashboardMediaData({ mediaType: selectedMediaType });
  };

  React.useEffect(() => {
    getData();
  }, [selectedMediaType]);

  useLoadingHandler({
    loading:
      status.genresDataRequest === RequestStatusEnum.InProgress ||
      status.popularDataRequest === RequestStatusEnum.InProgress,
    onLoadingStart,
    onLoadingDone,
  });

  const hasError =
    (selectedMediaType === MediaType.Movies && status.genresDataRequest === RequestStatusEnum.Error) ||
    (selectedMediaType === MediaType.TvShows && status.popularDataRequest === RequestStatusEnum.Error);

  return {
    data: {
      popularItems: data.popularData,
      items: data.genresData,
    },
    hasError,
    reload: getData,
  };
};

export default useMediaLogic;
