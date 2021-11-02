import { renderHook } from '@testing-library/react-hooks';
import useMediaSearch, { UseMediaSearchProps } from '..';
import { MediaType } from '../../types';
import * as FetchApiUtils from '../../../utils/network';
import { MediaResponseMock, MediaResponseSearchMock } from './mocks';
import { act } from 'react-test-renderer';

const initialProps: UseMediaSearchProps = {
  onLoadingStart: jest.fn(),
  onLoadingDone: jest.fn(),
  selectedMediaType: MediaType.Movies,
};

describe('Test for useMediaSearch custom hook', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should fetch data on render when search value is an empty string', async () => {
    const { fetchRequest } = mockFetchRequests({});
    const { result, waitForNextUpdate } = renderHook(() => useMediaSearch(initialProps));

    await waitForNextUpdate();

    expect(fetchRequest).toHaveBeenCalledTimes(1);
    expect(fetchRequest).toHaveBeenCalledWith(expect.stringContaining('/discover'));
    expect(initialProps.onLoadingStart).toHaveBeenCalled();
    expect(initialProps.onLoadingStart).toHaveBeenCalled();
    expect(result.current.data).toHaveLength(MediaResponseMock.results.length);
    expect(result.current.hasError).toBeFalsy();
    expect(result.current.searchValue).toEqual('');
  });

  it('Should hasError flag be true when request responds but data is undefined', async () => {
    const { fetchRequest } = mockFetchRequests({ hasResponseDataUndefined: true });
    const { result, waitForNextUpdate } = renderHook(() => useMediaSearch(initialProps));

    await waitForNextUpdate();

    expect(fetchRequest).toHaveBeenCalled();
    expect(result.current.data).toBeUndefined();
    expect(result.current.hasError).toBeTruthy();
  });

  it('Should hasError flag be true when request fails --> catch event', async () => {
    const { fetchRequest } = mockFetchRequests({ hasFetchError: true });
    const { result, waitForNextUpdate } = renderHook(() => useMediaSearch(initialProps));

    await waitForNextUpdate();

    expect(fetchRequest).toHaveBeenCalled();
    expect(result.current.data).toBeUndefined();
    expect(result.current.hasError).toBeTruthy();
  });

  it('Should call search api when on onSearchValueChange is called with >= 3 characters ', async () => {
    const { fetchRequest } = mockFetchRequests({});
    const { result, waitForNextUpdate } = renderHook(() => useMediaSearch(initialProps));

    await waitForNextUpdate();

    //First render of the hook
    expect(fetchRequest).toHaveBeenCalledTimes(1);
    expect(initialProps.onLoadingStart).toHaveBeenCalledTimes(1);
    expect(initialProps.onLoadingStart).toHaveBeenCalledTimes(1);
    expect(result.current.data).toHaveLength(MediaResponseMock.results.length);
    expect(result.current.hasError).toBeFalsy();
    expect(result.current.searchValue).toEqual('');

    //Calling onSearchValueChange event
    act(() => {
      result.current.onSearchValueChange('Hello');
    });

    await waitForNextUpdate();

    //Expected results
    expect(result.current.searchValue).toEqual('Hello');
    expect(fetchRequest).toHaveBeenCalledTimes(2);
    expect(fetchRequest).toHaveBeenNthCalledWith(1, expect.stringContaining('/discover'));
    expect(fetchRequest).toHaveBeenNthCalledWith(2, expect.stringContaining('/search'));
    expect(initialProps.onLoadingStart).toHaveBeenCalledTimes(2);
    expect(initialProps.onLoadingStart).toHaveBeenCalledTimes(2);
    expect(result.current.data).toHaveLength(MediaResponseSearchMock.results.length);
  });

  it('Should fetch next requets page when onLoadMore is called ', async () => {
    const { fetchRequest } = mockFetchRequests({});
    const { result, waitForNextUpdate } = renderHook(() => useMediaSearch(initialProps));

    await waitForNextUpdate();

    //First render of the hook
    expect(fetchRequest).toHaveBeenCalledTimes(1);
    expect(initialProps.onLoadingStart).toHaveBeenCalledTimes(1);
    expect(initialProps.onLoadingStart).toHaveBeenCalledTimes(1);
    expect(result.current.data).toHaveLength(MediaResponseMock.results.length);
    expect(result.current.hasError).toBeFalsy();
    expect(result.current.searchValue).toEqual('');

    //Calling onLoadMore event
    act(() => {
      result.current.onLoadMore();
    });

    await waitForNextUpdate();

    //Expected results
    expect(fetchRequest).toHaveBeenCalledTimes(2);
    expect(initialProps.onLoadingStart).toHaveBeenCalledTimes(2);
    expect(initialProps.onLoadingStart).toHaveBeenCalledTimes(2);
    expect(fetchRequest).toHaveBeenNthCalledWith(1, expect.stringContaining('/discover'));
    expect(fetchRequest).toHaveBeenNthCalledWith(2, expect.stringContaining('/discover'));
    expect(result.current.data).toHaveLength(MediaResponseMock.results.length + MediaResponseSearchMock.results.length);
  });

  it('Should clean request status when reload function is called ', async () => {
    const { fetchRequest } = mockFetchRequests({ hasResponseDataUndefined: true });
    const { result, waitForNextUpdate } = renderHook(() => useMediaSearch(initialProps));

    await waitForNextUpdate();

    //First render of the hook
    expect(fetchRequest).toHaveBeenCalledTimes(1);
    expect(initialProps.onLoadingStart).toHaveBeenCalledTimes(1);
    expect(initialProps.onLoadingStart).toHaveBeenCalledTimes(1);
    expect(result.current.data).toBeUndefined();
    expect(result.current.hasError).toBeTruthy();

    //Reloading page
    act(() => {
      result.current.reload();
    });

    expect(result.current.hasError).toEqual(false);
  });

  it('Should not update search value when a request is in progress', async () => {
    const { fetchRequest } = mockFetchRequests({});
    const { result, waitForNextUpdate } = renderHook(() => useMediaSearch(initialProps));

    await waitForNextUpdate();

    //First render of the hook
    expect(fetchRequest).toHaveBeenCalledTimes(1);
    expect(initialProps.onLoadingStart).toHaveBeenCalledTimes(1);
    expect(initialProps.onLoadingStart).toHaveBeenCalledTimes(1);
    expect(result.current.data).toHaveLength(MediaResponseMock.results.length);
    expect(result.current.hasError).toBeFalsy();
    expect(result.current.searchValue).toEqual('');

    //Calling twice onSearchValueChange event.
    act(() => {
      result.current.onSearchValueChange('Hello');
    });

    //Second call should do nothing because there are request pending.
    act(() => {
      result.current.onSearchValueChange('World');
    });

    await waitForNextUpdate();

    //Expected results
    expect(result.current.searchValue).toEqual('Hello');
  });

  it('Should not call fetch data if onSearchValueChange is called with less than 3 letters ', async () => {
    const { fetchRequest } = mockFetchRequests({});
    const { result, waitForNextUpdate } = renderHook(() => useMediaSearch(initialProps));

    await waitForNextUpdate();

    //First render of the hook
    expect(fetchRequest).toHaveBeenCalledTimes(1);
    expect(initialProps.onLoadingStart).toHaveBeenCalledTimes(1);
    expect(initialProps.onLoadingStart).toHaveBeenCalledTimes(1);
    expect(result.current.data).toHaveLength(MediaResponseMock.results.length);
    expect(result.current.hasError).toBeFalsy();
    expect(result.current.searchValue).toEqual('');

    act(() => {
      result.current.onSearchValueChange('He');
    });

    //Expected results: should keep same results as on render.
    expect(result.current.searchValue).toEqual('He');
    expect(fetchRequest).toHaveBeenCalledTimes(1);
    expect(initialProps.onLoadingStart).toHaveBeenCalledTimes(1);
    expect(initialProps.onLoadingStart).toHaveBeenCalledTimes(1);
    expect(result.current.data).toHaveLength(MediaResponseMock.results.length);
    expect(result.current.hasError).toBeFalsy();
  });
});

const mockFetchRequests = ({
  hasFetchError,
  hasResponseDataUndefined,
  hasSearchFetchError,
}: {
  hasFetchError?: boolean;
  hasResponseDataUndefined?: boolean;
  hasSearchFetchError?: boolean;
}) => {
  const fetchRequest = jest.spyOn(FetchApiUtils, 'fetchData');

  fetchRequest
    .mockImplementationOnce(() => {
      if (hasFetchError) {
        return Promise.reject({
          statusText: 'Error',
          status: 404,
          data: undefined,
          headers: '',
          config: {},
        });
      } else {
        return Promise.resolve({
          status: 200,
          data: hasResponseDataUndefined ? undefined : MediaResponseMock,
          statusText: 'Success',
          headers: '',
          config: {},
        });
      }
    })
    .mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: hasSearchFetchError ? undefined : MediaResponseSearchMock,
        statusText: 'Success',
        headers: '',
        config: {},
      });
    });

  return {
    fetchRequest,
  };
};
