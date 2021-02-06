import styled from 'styled-components';

export const Slider = styled.div``;

export const Slides = styled.div`
  overflow: hidden;
  position: relative;
`;

export const SlidesTrackWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const SlideWrapper = styled.div`
  flex: 0 0 727px;
  margin-right: 24px;
`;

export const SlideButton = styled.a`
  background: #fff;
  position: absolute;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  top: calc(50% - 28px);
  left: 739px;
  cursor: pointer;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
`;

export const RightArrow = styled.svg`
  width: 1.25rem;
  transform: rotate(90deg);
  fill: blue;
`;

export const ImageWrapper = styled.div`
  position: relative;
  border-radius: .25rem;
  overflow: hidden;
  padding-bottom: calc(100% / (16 / 9));
`;

export const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: auto;
`;

export const ImageCaption = styled.div`
  line-height: 20px;
  color: #666;
  font-size: 12px;
  margin-top: 8px;
  text-align: right;
`;

export const SlideIndicatorWrapper = styled.div``;

export const IndicatorImage = styled.div``;

