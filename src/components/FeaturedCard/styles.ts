import styled from 'styled-components/native';
import { scale, Metrics, Colors } from '../../utils/styling';
import LinearGradient from 'react-native-linear-gradient';

export const CustomGradientContainer = styled(LinearGradient).attrs(() => ({
  colors: [Colors.black + 'F2', Colors.black + 'CC', Colors.black + '00'],
  start: { x: 0, y: 1 },
  end: { x: 0, y: 0 },
}))`
  width: 100%;
  padding: ${scale(5)}px;
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

export const FeaturedTag = styled.Text`
  position: absolute;
  top: 0;
  right: 0;
  font-size: ${Metrics.text.h2}px;
  color: ${Colors.text};
  font-weight: bold;
  background-color: ${Colors.textAlert};
  padding: ${scale(10)}px;
  border-radius: ${Metrics.base.radius}px;
`;

export const Button = styled.TouchableOpacity``;
