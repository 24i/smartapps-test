import styled from 'styled-components/native';
import { scale, Metrics, Colors } from '../../utils/styling';
import { Image } from 'react-native';

export const Title = styled.Text`
  font-size: ${Metrics.text.h2}px;
  color: ${Colors.text};
  font-weight: bold;
`;

export const Button = styled.TouchableOpacity`
  height: ${scale(100)}px;
  background-color: ${Colors.backgroundTertiary};
  border-radius: ${Metrics.base.radius}px;
  margin-horizontal: ${scale(Metrics.base.margin)}px;
  margin-vertical: ${scale(5)}px;
  justify-content: space-between;
  flex-direction: row;
`;

export const CardImage = styled(Image).attrs(() => ({
  resizeMode: 'cover',
}))`
  flex: 1;
  max-width: 100%;
`;

export const CardImageContainer = styled.View`
  width: 40%;
  overflow: hidden;
`;

export const TextContainer = styled.View`
  width: 60%;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${scale(10)}px;
`;
