import styled from 'styled-components/native';
import { scale, Colors, Metrics } from '../../utils/styling';
import { Image } from 'react-native';
import { BackIcon, CloseIcon } from '../../../assets';

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: ${scale(20)}px;
  align-items: center;
`;

export const Button = styled.TouchableOpacity.attrs(() => ({
  hitSlop: { top: 20, bottom: 20, left: 20, right: 20 },
}))`
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

export const CloseImage = styled(Image).attrs(() => ({
  source: CloseIcon,
  resizeMode: 'contain',
}))`
  width: ${scale(20)}px;
  height: ${scale(20)}px;
  tint-color: ${Colors.text};
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: Colors.decoration,
  keyboardAppearance: 'dark',
})`
  flex: 1;
`;

export const InputStyleViewStyle = {
  fontSize: Metrics.text.h2,
  color: Colors.text,
  marginHorizontal: scale(20),
};
