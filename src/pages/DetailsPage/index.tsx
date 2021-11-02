import React from 'react';
import { SafeAreaView, Modal } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

import {
  Button,
  BackImage,
  Title,
  RatingText,
  Description,
  TextContainer,
  PageTile,
  Scroll,
  PlayButton,
  PlayImage,
  ErrorContainer,
  Container,
} from './styles';
import { Metrics, MOCKED_VIDEO_URL } from '../../utils';
import { VideoComponent, ProgressiveBackgroundImage, ErrorComponent } from '../../components';
import { MediaItem } from '../../hooks';

interface DetailsPageProps {
  route: RouteProp<{ params: { item: MediaItem } }, 'params'>;
  navigation: NativeStackNavigationProp<{
    goBack(): void;
  }>;
}
const DetailsPage = ({ route, navigation }: DetailsPageProps): JSX.Element => {
  const { item } = route.params;

  /** Flag that controls video visibility in this page */
  const [showVideo, setShowVideo] = React.useState<boolean>(false);

  /** Video Error */
  const [hasError, setHasError] = React.useState<boolean>(false);

  return (
    <Container>
      {showVideo && !hasError ? (
        <VideoComponent
          url={MOCKED_VIDEO_URL}
          onCloseVideo={() => setShowVideo(false)}
          title={item.title}
          onError={(): void => {
            setShowVideo(false);
            setHasError(true);
          }}
        />
      ) : (
        <SafeAreaView>
          <Button onPress={(): void => navigation.goBack()}>
            <BackImage />
            <PageTile>Explore</PageTile>
          </Button>
          <Scroll>
            <ProgressiveBackgroundImage
              source={item?.posterImageUrl}
              height={Metrics.screen.height * 0.6}
              content={'top'}
            />
            <TextContainer>
              <PlayButton onPress={() => setShowVideo(true)}>
                <PlayImage />
              </PlayButton>
              <Title>{item.title}</Title>
              <RatingText>Rating: {item.rate}</RatingText>
              <Description>{item.description + item.description}</Description>
            </TextContainer>
          </Scroll>
        </SafeAreaView>
      )}
      <Modal animationType="slide" visible={hasError} style={{ backgroundColor: 'black' }}>
        <ErrorContainer>
          <ErrorComponent
            message={'Ups! There was an error getting this video.'}
            onReload={(): void => setHasError(false)}
          />
        </ErrorContainer>
      </Modal>
    </Container>
  );
};

export default DetailsPage;
