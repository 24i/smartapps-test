import React from 'react';
import Slider from '@react-native-community/slider';

import { Colors } from '../../../utils';

import { SliderContainer, LabelsContainer, Labels } from './styles';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSlideCapture: ({ seekTime }: { seekTime: number }) => void;
  onSlideStart: () => void;
  onSlideComplete: () => void;
}

const ProgressBar = ({
  currentTime,
  duration,
  onSlideCapture,
  onSlideStart,
  onSlideComplete,
}: ProgressBarProps): JSX.Element => {
  const getMinutesFromSeconds = (time: number): string => {
    const minutes = time >= 60 ? Math.floor(time / 60) : 0;
    const seconds = Math.floor(time - minutes * 60);

    return `${minutes >= 10 ? minutes : '0' + minutes}:${seconds >= 10 ? seconds : '0' + seconds}`;
  };

  const handleOnSlide = (time: number): void => {
    onSlideCapture({ seekTime: time });
  };

  const position = getMinutesFromSeconds(currentTime);
  const fullDuration = getMinutesFromSeconds(duration);

  return (
    <SliderContainer>
      <Slider
        value={currentTime}
        minimumValue={0}
        maximumValue={duration}
        step={1}
        onValueChange={handleOnSlide}
        onSlidingStart={onSlideStart}
        onSlidingComplete={onSlideComplete}
        minimumTrackTintColor={Colors.videoProgressBar.minimumTrackTintColor}
        maximumTrackTintColor={Colors.videoProgressBar.maximumTrackTintColor}
        thumbTintColor={Colors.videoProgressBar.thumbTintColor}
      />
      <LabelsContainer>
        <Labels>{position}</Labels>
        <Labels isRight={true}>{fullDuration}</Labels>
      </LabelsContainer>
    </SliderContainer>
  );
};

export default ProgressBar;
