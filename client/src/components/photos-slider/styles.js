import styled from 'styled-components';

export const Slider = styled.div``;

export const Slides = styled.div`
  overflow: hidden;
  position: relative;
`;

export const SlidesTrackWrapper = styled.div`
  display: flex;
  position: relative;
  transition: transform 400ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s;

  transform: ${props => `translateX(${props.activeSlide * 821 * -1}px)`}
`;

export const SlideWrapper = styled.div`
  flex: 0 0 797px;
  margin-right: 24px;
`;

export const SlideButton = styled.a`
  background: #fff;
  position: absolute;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  top: calc(50% - 28px);
  left: 809px;
  cursor: pointer;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #ccf;
  }

  &:active {
    background-color: #99f;
  }
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
  height: 100%;
  object-fit: cover;
`;

export const ImageCaption = styled.div`
  line-height: 20px;
  color: #666;
  font-size: 12px;
  margin-top: 8px;
  text-align: right;
`;


export const SlideNavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

export const SlideNavImages = styled.div`
  border-right: 8px solid #fff;
  flex: 0 1 auto;
  overflow: hidden;
`;

export const SlideNavImagesTrack = styled.div`
  display: flex;
  height: 54px;
  transition: transform 400ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
  transform: ${props => `translateX(${props.offset * 110 * -1}px);`}
`;

export const NavButtonWrapper = styled.div`
  flex: 0 0 auto;
`;

export const NavImageWrapper = styled.div`
  border: 1px solid #fff;
  border-radius: 4px;
  cursor: pointer;
  flex: 0 0 100px;
  margin-right: 8px;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #fff;
    opacity: .5;
  }

  ${props => props.active && `
    border-color: blue;

    &::before {
      opacity: 0;
    }
  `}
`;

export const NavImage = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;


export const Button = styled.a`
  align-items: center;
  border: 1px solid blue;
  border-radius: 4px;
  box-sizing: border-box;
  color: blue;
  display: flex;
  height: 55px;
  padding: 19px 23px;

  svg {
    fill: blue;
    height: 19px;
    margin-right: 8px;
  }
`;

