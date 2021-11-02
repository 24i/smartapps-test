import styled from 'styled-components/native';
import { scale, Colors, Metrics } from '../../utils/styling';
import { Image, ScrollView } from 'react-native';
import { BackIcon, PlayIcon } from '../../../assets';

export const Container = styled.View`
  flex: 1;
`;

export const Scroll = styled(ScrollView).attrs(() => ({
  showsVerticalScrollIndicator: false,
  overScrollMode: 'never',
  contentContainerStyle: { paddingBottom: scale(60) },
}))``;

export const Button = styled.TouchableOpacity`
  margin: ${scale(20)}px;
  flex-direction: row;
`;

export const BackImage = styled(Image).attrs(() => ({
  source: BackIcon,
  resizeMode: 'contain',
}))`
  width: ${scale(20)}px;
  height: ${scale(20)}px;
  tint-color: ${Colors.text};
`;

export const TextContainer = styled.View`
  margin: ${scale(20)}px;
`;

export const Title = styled.Text`
  font-size: ${Metrics.text.h1}px;
  color: ${Colors.text};
  font-weight: bold;
`;

export const RatingText = styled.Text`
  font-size: ${Metrics.text.h2}px;
  color: ${Colors.decoration};
  font-weight: bold;
`;

export const Description = styled.Text`
  font-size: ${Metrics.text.h2}px;
  color: ${Colors.text};
`;

export const PageTile = styled.Text`
  font-size: ${Metrics.text.h2}px;
  color: ${Colors.decoration};
  margin-horizontal: ${scale(10)}px;
  font-weight: bold;
`;

export const PlayButton = styled.TouchableOpacity`
  width: ${scale(50)}px;
  height: ${scale(50)}px;
  border-radius: ${scale(25)}px;
  background-color: ${Colors.textAlert};
  position: absolute;
  top: -${scale(50)}px;
  right: ${scale(0)}px;
  z-index: 99;
  align-items: center;
  justify-content: center;
`;

export const PlayImage = styled(Image).attrs(() => ({
  source: PlayIcon,
  resizeMode: 'contain',
}))`
  width: ${scale(20)}px;
  height: ${scale(20)}px;
  tint-color: ${Colors.text};
`;

export const ErrorContainer = styled.View`
  flex: 1;
  background-color: ${Colors.background};
  justify-content: center;
  align-items: center;
`;
