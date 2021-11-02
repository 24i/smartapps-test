import React from 'react';

import { ItemImageBackground } from './styles';
import { ActivityIndicator } from 'react-native';
import { Colors } from '../../utils';
import { DefaultPlaceHolder } from '../../../assets';

interface ProgressiveImageProps {
  source?: string;
  children?: React.ReactNode;
  height?: number;
  content?: 'top' | 'bottom';
}

const ProgressiveBackgroundImage = ({
  source,
  children,
  height,
  content = 'bottom',
}: ProgressiveImageProps): JSX.Element => {
  const [isImageLoading, setImageLoading] = React.useState(false);

  return (
    <ItemImageBackground
      source={source ? { uri: source } : DefaultPlaceHolder}
      height={height}
      onLoadStart={() => setImageLoading(true)}
      onLoadEnd={() => setImageLoading(false)}
      content={content}
    >
      {isImageLoading && <ActivityIndicator color={Colors.decoration} size={'large'} />}
      {children}
    </ItemImageBackground>
  );
};

export default ProgressiveBackgroundImage;
