import React from 'react';

import { ErrorButton, ErrorContainer, ErrorIcon, ErrorMessage } from './styles';

export interface ErrorProps {
  onReload: () => void;
  message?: string;
}

const ErrorComponent = ({ message, onReload }: ErrorProps): JSX.Element => {
  return (
    <ErrorContainer>
      {message ? (
        <ErrorMessage>{message}</ErrorMessage>
      ) : (
        <>
          <ErrorMessage>Ups! There was an error getting this information. </ErrorMessage>
          <ErrorMessage> Please, try again</ErrorMessage>
        </>
      )}

      <ErrorButton onPress={onReload}>
        <ErrorIcon />
      </ErrorButton>
    </ErrorContainer>
  );
};

export default ErrorComponent;
