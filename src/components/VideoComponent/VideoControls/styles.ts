import styled from 'styled-components/native';
import { scale, Colors, Metrics } from '../../../utils/styling';
import { PlayButtonIcon, PauseButtonIcon, SkipButtonIcon, CloseIcon, ReloadIcon } from '../../../../assets';
import { Image } from 'react-native';

export const ControlOverlay = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: space-between;
  background-color: ${Colors.background}99;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CloseButton = styled.TouchableOpacity.attrs(() => ({
  hitSlop: { top: 12, bottom: 12, left: 12, right: 12 },
}))`
  flex-direction: row;
  align-self: flex-end;
  align-items: center;
  margin: ${scale(20)}px;
  padding: ${scale(5)}px;
`;

export const VideoTitle = styled.Text`
  font-size: ${Metrics.text.h2}px;
  color: ${Colors.text};
  align-items: center;
  margin: ${scale(20)}px;
  max-width: 50%;
`;

export const CloseButtonImage = styled(Image).attrs(() => ({
  source: CloseIcon,
  resizeMode: 'contain',
}))`
  width: ${scale(30)}px;
  height: ${scale(30)}px;
  margin-horizontal: ${scale(2)}px;
  tint-color: ${Colors.text};
`;

export const VideoSkipForwardImage = styled(Image).attrs(() => ({
  source: SkipButtonIcon,
  resizeMode: 'contain',
}))`
  width: ${scale(30)}px;
  height: ${scale(30)}px;
  margin-horizontal: ${scale(2)}px;
  tint-color: ${Colors.text};
`;

export const VideoSkipBackImage = styled(Image).attrs(() => ({
  source: SkipButtonIcon,
  resizeMode: 'contain',
  style: { transform: [{ rotate: '180deg' }] },
}))`
  width: ${scale(30)}px;
  height: ${scale(30)}px;
  margin-horizontal: ${scale(2)}px;
  tint-color: ${Colors.text};
  transform: rotate(180deg);
`;

export const VideoPlayImage = styled(Image).attrs(() => ({
  source: PlayButtonIcon,
  resizeMode: 'contain',
}))`
  width: ${scale(35)}px;
  height: ${scale(35)}px;
  margin-horizontal: ${scale(2)}px;
  tint-color: ${Colors.text};
`;

export const VideoPauseImage = styled(Image).attrs(() => ({
  source: PauseButtonIcon,
  resizeMode: 'contain',
}))`
  width: ${scale(30)}px;
  height: ${scale(30)}px;
  margin-horizontal: ${scale(2)}px;
  tint-color: ${Colors.text};
`;

export const ReloadButtonImage = styled(Image).attrs(() => ({
  source: ReloadIcon,
  resizeMode: 'contain',
}))`
  width: ${scale(30)}px;
  height: ${scale(30)}px;
  margin-horizontal: ${scale(2)}px;
  tint-color: ${Colors.text};
`;

export const ControlsView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  flex: 3;
  margin-horizontal: ${scale(5)}px;
`;

export const ControlButton = styled.TouchableOpacity.attrs(() => ({
  hitSlop: { top: 12, bottom: 12, left: 12, right: 12 },
}))`
  padding: ${scale(10)}px;
`;
