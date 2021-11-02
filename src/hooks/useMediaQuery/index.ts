import React from 'react';

/**
 * useMediaQuery - Custom hook responsible to fetch data for dashboard
 */

import { MediaItem, ServiceRequest, RequestStatusEnum, MediaType, GenreIdEnum } from '../types';
import { mapServerResponseToMediaType } from './utils';
import { getPopularMedia, getMedia } from '../../utils';

interface MediaQueryResult {
  data: {
    popularData?: MediaItem[];
    genresData?: MediaItem[];
  };
  status: {
    popularDataRequest: RequestStatusEnum;
    genresDataRequest: RequestStatusEnum;
  };
  getDashboardMediaData: ({ mediaType }: { mediaType: MediaType }) => void;
}

const useMediaQuery = (): MediaQueryResult => {
  const [{ status: popularStatus, data: popularData }, setPopularRequestStatus] = React.useState<
    ServiceRequest<MediaItem[]>
  >({
    status: RequestStatusEnum.Waiting,
  });

  const [{ status: genresStatus, data: genresData }, setGenresRequestStatus] = React.useState<
    ServiceRequest<MediaItem[]>
  >({
    status: RequestStatusEnum.Waiting,
  });

  const fetchPopularData = async (mediaType: MediaType) => {
    setPopularRequestStatus({ status: RequestStatusEnum.InProgress });

    try {
      const response = await getPopularMedia(mediaType);

      if (response.data) {
        setPopularRequestStatus({
          status: RequestStatusEnum.Success,
          data: mapServerResponseToMediaType(response.data),
        });
      } else {
        setPopularRequestStatus({ status: RequestStatusEnum.Error });
      }
    } catch {
      setPopularRequestStatus({ status: RequestStatusEnum.Error });
    }
  };

  const fetchDashboardDataByGenres = async (mediaType: MediaType, genres: GenreIdEnum[]) => {
    setGenresRequestStatus({ status: RequestStatusEnum.InProgress });

    Promise.all(genres.map((genre) => getMedia({ mediaType: mediaType, genres: [genre] })))
      .then((responses) => {
        let mergedApiResponses: MediaItem[] = [];

        for (const apiResponse of responses) {
          if (apiResponse.data) {
            //This step will allow to concatenate the responses from all succesfull fetch requests.
            mergedApiResponses = mergedApiResponses.concat(mapServerResponseToMediaType(apiResponse.data));
          }
        }

        //If any of the requests respond with data, request will be succesfull. Otherwise will throw an error.
        if (mergedApiResponses.length > 0) {
          setGenresRequestStatus({
            status: RequestStatusEnum.Success,
            data: mergedApiResponses,
          });
        } else {
          setGenresRequestStatus({ status: RequestStatusEnum.Error });
        }
      })
      .catch(() => {
        setGenresRequestStatus({ status: RequestStatusEnum.Error });
      });
  };

  const getDashboardMediaData = React.useCallback(({ mediaType }: { mediaType: MediaType }): void => {
    fetchPopularData(mediaType);

    /** At the moment we'll only fetch documentary and family genres */
    const genresToFetch = [GenreIdEnum.Documentary, GenreIdEnum.Family];
    fetchDashboardDataByGenres(mediaType, genresToFetch);
  }, []);

  return {
    data: {
      popularData,
      genresData,
    },
    status: {
      popularDataRequest: popularStatus,
      genresDataRequest: genresStatus,
    },
    getDashboardMediaData,
  };
};

export default useMediaQuery;
