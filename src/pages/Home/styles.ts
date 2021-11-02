import styled from 'styled-components/native';
import { Image, TouchableOpacity, ScrollView } from 'react-native';
import { scale, Metrics, Colors } from '../../utils/styling';

import { SearchIcon } from '../../../assets';

export const Container = styled.View`
  flex: 1;
`;

export const AppTitle = styled.Text`
  font-size: ${Metrics.text.h1}px;
  color: ${Colors.textSecondary};
  font-weight: bold;
`;

export const HeaderContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-horizontal: ${Metrics.base.margin}px;
`;

export const SearchImage = styled(Image).attrs(() => ({
  source: SearchIcon,
  resizeMode: 'contain',
}))`
  width: ${scale(25)}px;
  height: ${scale(25)}px;
  tint-color: ${Colors.images};
`;

interface MediaTypeProps {
  isSelected?: boolean;
}

export const Scroll = styled(ScrollView).attrs(() => ({
  showsVerticalScrollIndicator: false,
  overScrollMode: 'never',
  bounces: false,
}))``;

export const Button = styled(TouchableOpacity)<MediaTypeProps>`
  border-bottom-color: ${({ isSelected }): string => (isSelected ? Colors.decoration : 'transparent')};
  border-bottom-width: ${({ isSelected }): number => (isSelected ? scale(4) : 0)}px;
  padding: ${Metrics.button.padding}px;
`;

export const MenuContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: ${scale(Metrics.base.margin)}px;
  margin-horizontal: ${Metrics.base.margin}px;
`;

export const MediaTypeOption = styled.Text<MediaTypeProps>`
  font-size: ${Metrics.text.h2}px;
  color: ${Colors.text};
  padding-horizontal: ${scale(20)}px;
  font-weight: ${({ isSelected }): string => (isSelected ? 'bold' : 'normal')};
`;
