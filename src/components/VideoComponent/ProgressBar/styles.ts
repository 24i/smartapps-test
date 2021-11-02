import styled from 'styled-components/native';
import { Colors, scale, Metrics } from '../../../utils';

export const SliderContainer = styled.View`
  flex: 1;
`;

export const LabelsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${scale(5)}px;
`;

interface LabelsProps {
  isRight?: boolean;
}

export const Labels = styled.Text<LabelsProps>`
  flex: 1;
  font-size: ${Metrics.text.h2}px;
  color: ${Colors.text};

  ${({ isRight }): string =>
    isRight ? `text-align: right; padding-right: ${scale(10)}px` : `padding-left: ${scale(10)}px`}
`;
