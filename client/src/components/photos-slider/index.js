import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GlobalStyles from '../globalStyles.js';
import {
  Button,
  ImageWrapper,
  Image,
  ImageCaption,
  NavButtonWrapper,
  NavImage,
  NavImageWrapper,
  RightArrow,
  Slider,
  Slides,
  SlidesTrackWrapper,
  SlideButton,
  SlideNavImages,
  SlideNavImagesTrack,
  SlideNavWrapper,
  SlideWrapper,
} from './styles.js';

const SlideNav = ({ photos, activeSlide = 0, handleSetSlide }) => {
  let offset = 0;

  if (photos.length > 6) {
    if (activeSlide > 3) {
      offset = activeSlide - 3;
    }

    if (activeSlide > photos.length - 3) {
      offset = photos.length - 6;
    }
  }

  return (
    <SlideNavWrapper>
      <SlideNavImages>
        <SlideNavImagesTrack offset={offset}>
          {photos.map((photo, i) => (
            <NavImageWrapper
              onClick={() => handleSetSlide(i)}
              key={photo.id}
              active={i === activeSlide}
            >
              <NavImage src={photo.url} alt={photo.description} />
            </NavImageWrapper>
          ))}
        </SlideNavImagesTrack>
      </SlideNavImages>

      <NavButtonWrapper>
        <Button>
          <svg viewBox="0 0 23 19" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.4947799,5.5555602 L9.4695599,3.61348877 L6.8999999,3.61348877 C3.59733709,3.61348877 0.919999897,6.24648084 0.919999897,9.49444115 C0.919999897,12.7424015 3.59733709,15.3753935 6.8999999,15.3753935 L10.5799999,15.3753935 C10.8340509,15.3753935 11.0399999,15.5779314 11.0399999,15.8277745 C11.0399999,16.0776176 10.8340509,16.2801554 10.5799999,16.2801554 L6.8999999,16.2801554 C3.08923516,16.2801554 4.66684095e-16,13.2420876 0,9.49444115 C-4.66684083e-16,5.74679468 3.08923516,2.70872692 6.8999999,2.70872687 L9.4695599,2.70872687 L7.4947799,0.766655438 C7.32045268,0.589150703 7.32294581,0.306998039 7.50038335,0.132499416 C7.6778209,-0.0419992074 7.96472561,-0.0444510378 8.1452199,0.126988771 L10.9052199,2.84127449 C11.0847956,3.01792918 11.0847956,3.30428646 10.9052199,3.48094115 L8.1452199,6.19522687 C7.96472561,6.36666668 7.6778209,6.36421485 7.50038335,6.18971622 C7.32294581,6.0152176 7.32045268,5.73306493 7.4947799,5.5555602 Z M16.0999999,2.70872687 L12.4199999,2.70872687 C12.1659489,2.70872687 11.9599999,2.91126472 11.9599999,3.16110782 C11.9599999,3.41095092 12.1659489,3.61348877 12.4199999,3.61348877 L16.0999999,3.61348877 C19.4026627,3.61348877 22.0799999,6.24648084 22.0799999,9.49444115 C22.0799999,12.7424015 19.4026627,15.3753935 16.0999999,15.3753935 L13.5304399,15.3753935 L15.5052199,13.4333221 C15.6247999,13.3197408 15.6727577,13.151544 15.6306606,12.9933783 C15.5885635,12.8352126 15.4629628,12.7116923 15.3021333,12.6702924 C15.1413037,12.6288926 14.9702742,12.676056 14.8547799,12.7936554 L12.0947799,15.5079412 C11.9152042,15.6845958 11.9152042,15.9709531 12.0947799,16.1476078 L14.8547799,18.8618935 C15.0352742,19.0333333 15.3221789,19.0308815 15.4996164,18.8563829 C15.677054,18.6818843 15.6795471,18.3997316 15.5052199,18.2222269 L13.5304399,16.2801554 L16.0999999,16.2801554 C19.9107646,16.2801554 22.9999998,13.2420876 22.9999998,9.49444115 C22.9999998,5.74679468 19.9107646,2.70872692 16.0999999,2.70872687 Z"></path>
          </svg>
          Virtual Tour
        </Button>
      </NavButtonWrapper>
    </SlideNavWrapper>
  );
};

const Slide = ({ photo }) => (
  <SlideWrapper>
    <ImageWrapper>
      <Image src={photo.url} alt={photo.description} />
    </ImageWrapper>
    <ImageCaption>{photo.description}</ImageCaption>
  </SlideWrapper>
);

const SlidesTrack = ({ photos, activeSlide }) => (
  <SlidesTrackWrapper activeSlide={activeSlide}>
    {photos.map(photo => <Slide key={photo.id} photo={photo} />)}
  </SlidesTrackWrapper>
);

const SlideNext = ({ handleClick }) => (
  <SlideButton onClick={handleClick}>
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
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleNextSlide = () => {
    if (activeSlideIndex < photos.length - 1) {
      setActiveSlideIndex(activeSlideIndex + 1);
    } else {
      setActiveSlideIndex(0);
    }
  };

  const handleSetSlide = i => {
    setActiveSlideIndex(i);
  };

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
        <SlidesTrack photos={photos} activeSlide={activeSlideIndex} />
        <SlideNext handleClick={handleNextSlide}/>
      </Slides>
      <SlideNav photos={photos} activeSlide={activeSlideIndex} handleSetSlide={handleSetSlide} />
    </Slider>
  );
};

export default PhotosSlider;
