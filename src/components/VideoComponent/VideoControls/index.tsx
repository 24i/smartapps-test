import React from 'react';
import Video from 'react-native-video';

import ProgressBar from '../ProgressBar';

import {
  ControlOverlay,
  CloseButton,
  CloseButtonImage,
  ControlButton,
  ControlsView,
  VideoSkipBackImage,
  VideoSkipForwardImage,
  VideoPlayImage,
  VideoPauseImage,
  VideoTitle,
  HeaderContainer,
  ReloadButtonImage,
} from './styles';

export interface ControlsProps {
  play: boolean;
  currentTime: number;
  duration: number;
  showControls: boolean;
}

export interface VideoControlsProps {
  title: string;
  state: ControlsProps;
  videoPlayer: React.MutableRefObject<Video | null | undefined>;
  setControlsState: React.Dispatch<React.SetStateAction<ControlsProps>>;
  onClose: () => void;
  onRestart: () => void;
}

export const VideoControls = ({
  title,
  state: controlsState,
  videoPlayer,
  setControlsState,
  onClose,
  onRestart,
}: VideoControlsProps): JSX.Element => {
  const isVideoInEnd = controlsState.duration === controlsState.currentTime;

  const handlePlayPause = (): void => {
    // If playing, pause and show controls immediately.
    if (controlsState.play) {
      setControlsState({ ...controlsState, play: false, showControls: true });
      return;
    }

    setControlsState({ ...controlsState, play: true });
    setTimeout(() => setControlsState({ ...controlsState, play: true, showControls: false }), 2000);
  };

  const skipBackward = (): void => {
    if (videoPlayer?.current) {
      const newTime = controlsState.currentTime - 15 > 0 ? controlsState.currentTime - 15 : 0;

      videoPlayer.current.seek(newTime);
      setControlsState({ ...controlsState, currentTime: newTime });
    }
  };

  const skipForward = (): void => {
    const { currentTime, duration } = controlsState;
    if (videoPlayer.current) {
      const newTime = currentTime + 15 > duration ? duration : currentTime + 15;

      videoPlayer.current.seek(newTime);
      setControlsState({ ...controlsState, currentTime: newTime });
    }
  };

  const onSeek = ({ seekTime }: { seekTime: number }): void => {
    if (videoPlayer.current) {
      videoPlayer.current.seek(seekTime);
      setControlsState({ ...controlsState, currentTime: seekTime });
    }
  };

  return (
    <ControlOverlay>
      <HeaderContainer>
        <VideoTitle>{title}</VideoTitle>
        <CloseButton onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <CloseButtonImage />
        </CloseButton>
      </HeaderContainer>
      <ControlsView>
        <ControlButton onPress={skipBackward}>
          <VideoSkipBackImage />
        </ControlButton>

        <ControlButton
          onPress={(): void => {
            if (isVideoInEnd) {
              onRestart();
            } else {
              handlePlayPause();
            }
          }}
        >
          {isVideoInEnd ? <ReloadButtonImage /> : controlsState.play ? <VideoPauseImage /> : <VideoPlayImage />}
        </ControlButton>

        <ControlButton onPress={skipForward}>
          <VideoSkipForwardImage />
        </ControlButton>
      </ControlsView>

      <ProgressBar
        currentTime={controlsState.currentTime}
        duration={controlsState.duration > 0 ? controlsState.duration : 0}
        onSlideStart={handlePlayPause}
        onSlideComplete={handlePlayPause}
        onSlideCapture={onSeek}
      />
    </ControlOverlay>
  );
};
