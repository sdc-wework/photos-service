import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GlobalStyles from '../globalStyles.js';
import {
  Slider,
  Slides,
  SlidesTrackWrapper,
  SlideButton,
  SlideIndicatorWrapper,
  SlideWrapper,
  RightArrow,
  ImageWrapper,
  Image,
  ImageCaption,
} from './styles.js';

const SlideIndicator = ({ photos, activeIndex }) => (
  <SlideIndicatorWrapper></SlideIndicatorWrapper>
);

const Slide = ({ photo }) => (
  <SlideWrapper>
    <ImageWrapper>
      <Image src={photo.url} alt={photo.description} />
    </ImageWrapper>
    <ImageCaption>{photo.description}</ImageCaption>
  </SlideWrapper>
);

const SlidesTrack = ({ photos }) => (
  <SlidesTrackWrapper>
    {photos.map(photo => <Slide key={photo.id} photo={photo} />)}
  </SlidesTrackWrapper>
);

const SlideNext = () => (
  <SlideButton>
    <RightArrow xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.99 6.99">
      <g data-name="Layer 2">
        <path d="M11.85 6.85a.46.46 0 0 1-.67 0L6 1.2.81 6.85a.46.46 0 0 1-.67 0 .46.46 0 0 1 0-.67l5.47-6V.1A.5.5 0 0 1 6 0a.45.45 0 0 1 .35.14v.08l5.46 6a.46.46 0 0 1 .04.63z" data-name="Layer 1"></path>
      </g>
    </RightArrow>
  </SlideButton>
);

const PhotosSlider = () => {
  const { workspaceId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:6001/api/photos/workspace/${workspaceId}`)
      .then(res => res.json())
      .then(data => {
        setPhotos(data);
      });
  }, []);

  return (
    <Slider>
      <GlobalStyles />
      <Slides>
        <SlidesTrack photos={photos} />
      </Slides>
    </Slider>
  );
};

export default PhotosSlider;
