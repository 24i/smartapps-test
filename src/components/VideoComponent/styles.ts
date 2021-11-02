import { StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { Colors } from '../../utils/styling';

export const VideoContainer = styled.View`
  flex: 1;
`;

export const VideoTouchable = styled.TouchableWithoutFeedback``;

export const videoStyles = StyleSheet.create({
  fullscreenVideo: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').height,
    backgroundColor: Colors.black,
  },
});
