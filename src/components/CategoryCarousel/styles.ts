import styled from 'styled-components/native';
import { scale, Metrics, Colors } from '../../utils/styling';
import { TouchableOpacity, ImageBackground } from 'react-native';
import { DefaultPlaceHolder } from '../../../assets';

export const CategoryContainer = styled.View`
  margin-bottom: ${Metrics.base.margin}px;
`;

export const CategoryTitleContainer = styled.View`
  flex-direction: row;
  margin-horizontal: ${Metrics.base.margin}px;
  margin-bottom: ${Metrics.base.margin}px;
  margin-top: ${Metrics.base.margin / 2}px;
`;

export const CategoryTextContainer = styled.View`
  flex-direction: column;
  width: 70%;
`;

export const CategoryTitle = styled.Text`
  font-size: ${Metrics.text.h2}px;
  color: ${Colors.text};
  font-weight: bold;
`;

export const CategorySubtitle = styled.Text`
  font-size: ${Metrics.text.p1}px;
  color: ${Colors.text};
`;

export const MoreButton = styled(TouchableOpacity)`
  width: 30%;
`;

export const MoreText = styled.Text`
  font-size: ${Metrics.text.h2}px;
  color: ${Colors.textAlert};
  text-transform: uppercase;
  font-weight: bold;
  align-items: center;
  align-self: flex-end;
`;

interface CardContainerProps {
  isFirstItem: boolean;
}

export const CardContainer = styled.TouchableOpacity<CardContainerProps>`
  height: ${scale(200)}px;
  width: ${Metrics.screen.width * 0.3}px;
  flex-direction: column;
  margin-right: ${Metrics.base.margin}px;
  margin-left: ${({ isFirstItem }): number => (isFirstItem ? Metrics.base.margin : 0)}px;
  border-radius: ${Metrics.base.radius}px;
  overflow: hidden;
`;

export const ItemImageBackground = styled(ImageBackground).attrs(() => ({
  resizeMode: 'cover',
  defaultSource: DefaultPlaceHolder,
}))`
  height: 100%;
  justify-content: flex-end;
`;

export const ItemTextContainer = styled.View`
  flex-direction: column;
  background-color: ${Colors.backgroundSecondary}80;
  padding-horizontal: ${scale(5)}px;
  padding-vertical: ${scale(10)}px;
  height: 40%;
  justify-content: space-between;
`;

export const ItemTitle = styled.Text.attrs(() => ({
  numberOfLines: 3,
}))`
  font-size: ${Metrics.text.h2}px;
  color: ${Colors.text};
  font-weight: bold;
  margin-bottom ${scale(10)}px;
`;
