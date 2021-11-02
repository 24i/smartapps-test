import { DefaultPlaceHolder } from '../../../assets';
import { ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { Metrics } from '../../utils/styling';

interface ItemImageBackgroundProps {
  height?: number;
  content?: 'top' | 'bottom';
}

export const ItemImageBackground = styled(ImageBackground).attrs(() => ({
  resizeMode: 'cover',
  defaultSource: DefaultPlaceHolder,
}))<ItemImageBackgroundProps>`
  height: ${({ height }): string => (height ? `${height}px` : '100%')};
  justify-content: ${({ content }): string => (content === 'top' ? 'flex-start' : 'flex-end')};
  overflow: hidden;
  border-radius: ${Metrics.base.radius}px;
`;
