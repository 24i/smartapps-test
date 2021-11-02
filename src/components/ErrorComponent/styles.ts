import styled from 'styled-components/native';
import { scale, Colors, Metrics } from '../../utils/styling';
import { RefreshIcon } from '../../../assets';

export const ErrorContainer = styled.View`
  margin: ${2 * Metrics.base.margin}px;
`;

export const ErrorMessage = styled.Text`
  margin-bottom: ${scale(14)}px;
  letter-spacing: ${scale(1)}px;
  font-size: ${Metrics.text.h2}px;
  color: ${Colors.textAlert};
  align-self: center;
  text-align: center;
  line-height: ${scale(24)}px;
`;

export const ErrorButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const ErrorIcon = styled.Image.attrs(() => ({
  source: RefreshIcon,
}))`
  tint-color: ${Colors.textAlert};
  width: ${scale(30)}px;
  height: ${scale(30)}px;
`;
