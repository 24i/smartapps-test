import React from 'react';

/**
 * useLoadingHandler - Custom hook that will execute loading callbacks.
 */

export interface Loadable {
  /**
   * Callback to be executed when there pending tasks
   */
  onLoadingStart: () => void;
  /**
   * Callback to be executed when pending task are done, after being pending
   */
  onLoadingDone: () => void;
}

export interface LoadingHandlerProps extends Loadable {
  loading: boolean;
}

const useLoadingHandler = ({ loading, onLoadingStart, onLoadingDone }: LoadingHandlerProps): void => {
  const onMountRef = React.useRef<boolean>(true);

  React.useEffect(
    function handleLoading() {
      // Will not execute stop loading when start with loading false, but will execute loading when start with loading true.
      if (onMountRef.current && !loading) {
        onMountRef.current = false;
        return;
      }

      onMountRef.current = false;

      loading ? onLoadingStart && onLoadingStart() : onLoadingDone && onLoadingDone();
    },
    [loading, onLoadingStart, onLoadingDone]
  );
};

export default useLoadingHandler;
