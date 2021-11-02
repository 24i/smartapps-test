import React from 'react';

import { StarImage, Container } from './styles';

interface RatingComponentProps {
  rate?: number;
}

const RatingComponent = ({ rate = 0 }: RatingComponentProps): JSX.Element => {
  const rateNumber = Math.round(rate / 2);
  return (
    <Container>
      {Array.from({ length: rateNumber }, (_, index) => (
        <StarImage key={index} />
      ))}
    </Container>
  );
};

export default RatingComponent;
