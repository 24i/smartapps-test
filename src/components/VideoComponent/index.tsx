import React from 'react';
import Orientation from 'react-native-orientation';

import Video, { OnLoadData, OnProgressData } from 'react-native-video';
import { ActivityIndicator, StatusBar, Platform } from 'react-native';

import { Colors, scale, setHttp } from '../../utils';
import { VideoContainer, VideoTouchable, videoStyles } from './styles';
import { ControlsProps, VideoControls } from './VideoControls';

interface VideoComponentProps {
  title: string;
  url: string;
  onCloseVideo: () => void;
  onError: () => void;
}

const VideoComponent = ({ title, url, onCloseVideo, onError }: VideoComponentProps) => {
  const videoPlayer = React.useRef<Video | null>();

  /* This mounted ref will avoid call set state on an unmounted component,
   that can happen when onClose is called */
  const mountedRef = React.useRef<boolean>(true);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [controlsState, setControlsState] = React.useState<ControlsProps>({
    play: true,
    currentTime: 0,
    duration: 0,
    showControls: false,
  });

  const setVideoReference = (ref: Video | null): void => {
    videoPlayer.current = ref;
  };

  const onLoadEnd = (data: OnLoadData): void => {
    if (mountedRef.current) {
      setIsLoading(false);
      setControlsState((prevState) => ({
        ...prevState,
        duration: data.duration,
        currentTime: data.currentTime,
      }));
    }
  };

  const onProgress = (data: OnProgressData): void => {
    if (mountedRef.current)
      setControlsState((prevState) => ({
        ...prevState,
        currentTime: data.currentTime,
      }));
  };

  const onEnd = (): void => {
    if (videoPlayer.current && mountedRef.current) {
      //on Android onEnd is called a few ms before duration. This way we update currentTime = duration in onEnd.
      setControlsState({ ...controlsState, play: false, currentTime: controlsState.duration });
    }
  };

  const onRestart = (): void => {
    if (videoPlayer.current && mountedRef.current) {
      videoPlayer.current.seek(0);
      setControlsState({ ...controlsState, play: true });
    }
  };

  const showControls = (): void => {
    controlsState.showControls && mountedRef.current
      ? setControlsState((prevState) => ({ ...prevState, showControls: false }))
      : setControlsState((prevState) => ({ ...prevState, showControls: true }));
  };

  const onBuffer = (bufferInfo: { isBuffering: boolean }): void => {
    if (mountedRef.current) setIsLoading(bufferInfo.isBuffering && controlsState.play);
  };

  React.useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (Platform.OS === 'ios') {
      //There is a bug in Orientation lib, and in iOS landscapeRight is landscapeLeft
      Orientation.lockToLandscapeRight();
    } else {
      Orientation.lockToLandscapeLeft();
    }
    StatusBar.setHidden(true);

    return () => {
      Orientation.lockToPortrait();
      StatusBar.setHidden(false);
    };
  }, []);

  React.useEffect(() => {
    if (!url) {
      onError();
    }
  }, [url]);

  return (
    <VideoContainer>
      <VideoTouchable onPress={showControls}>
        <VideoContainer>
          <Video
            ref={(ref): void => setVideoReference(ref)}
            //Video component would crash if url doesn't contain http/https
            source={{ uri: setHttp(url), type: 'mp4' }}
            onError={onError}
            style={videoStyles.fullscreenVideo}
            controls={false}
            resizeMode="contain"
            onLoadStart={(): void => {
              setIsLoading(true);
            }}
            onLoad={onLoadEnd}
            ignoreSilentSwitch="ignore"
            playInBackground={false}
            onEnd={onEnd}
            paused={!controlsState.play}
            onProgress={onProgress}
            onBuffer={onBuffer}
          />
          {controlsState.showControls && (
            <VideoControls
              state={controlsState}
              setControlsState={setControlsState}
              videoPlayer={videoPlayer}
              onClose={onCloseVideo}
              title={title}
              onRestart={onRestart}
            />
          )}
          {isLoading && (
            <ActivityIndicator
              size={'large'}
              style={{ position: 'absolute', alignSelf: 'center', marginTop: scale(30), zIndex: 99 }}
              color={Colors.decoration}
            />
          )}
        </VideoContainer>
      </VideoTouchable>
    </VideoContainer>
  );
};

export default VideoComponent;
