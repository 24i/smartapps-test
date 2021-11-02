import styled from 'styled-components/native';
import { Colors, scale } from '../../utils/styling';
import { Image } from 'react-native';
import { StarIcon } from '../../../assets';

export const StarImage = styled(Image).attrs(() => ({
  source: StarIcon,
  resizeMode: 'contain',
}))`
  width: ${scale(10)}px;
  height: ${scale(10)}px;
  margin-horizontal: ${scale(2)}px;
  tint-color: ${Colors.decoration};
`;

export const Container = styled.View`
  margin-top: ${scale(5)}px;
  flex-direction: row;
`;
