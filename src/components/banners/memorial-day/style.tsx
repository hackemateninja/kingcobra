// Packages
import styled from 'styled-components';

// Definitions
import { ThemeType } from '../../../definitions/TTheme';

const HeaderWrapper = styled.header<{ theme: ThemeType }>`
  height: ${(props) => props.theme.header.height.md};
  margin: ${(props) => props.theme.header.margin.md};
  position: relative;
  width: 100%;
  color: #fff;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.3);
  margin-bottom: 42px;
  overflow: hidden;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  padding: 0 126px 0 225px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background-image: url('//img.autotropolis.net/content/images/carcom/userimages/cc-bg.png');
  @media screen and (max-width: 767px) {
    height: 96px;
    box-shadow: none;
    margin: ${(props) => props.theme.header.margin.xs};
    padding: 33px 0 0;
  }
`;

const HeaderBar = styled.div`
  display: none;
  @media screen and (max-width: 767px) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: #f1f1f1;
    z-index: 50;
    height: 33px;
    text-align: center;
    display: block;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.3);
  }
`;

const HeaderLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 5;
`;

const ImageLeft = styled.div`
  position: absolute;
  bottom: 0;
  display: block;
  width: 268px;
  height: 133px;
  background-position: -21px -297px;
  background-image: url('//static.car.com/cars/assets/img/bnr_images/memorial-day/carcom/flags.png');
  background-repeat: no-repeat;
  display: block;
  @media screen and (max-width: 767px) {
    width: 118px;
    height: 75px;
    background-position: -53px 0;
  }
`;

const HeaderDiagonal = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  background-image: url('//static.car.com/cars/assets/img/bnr_images/cc-icons.png');
  background-repeat: no-repeat;
  background-position: -130px bottom;
  background-size: 280px;
  height: ${(props) => props.theme.header.height.md};
  width: 126px;
  @media screen and (max-width: 1024px) {
    width: 126px;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const HeaderLogo = styled.svg`
  position: absolute;
  top: 50%;
  left: 23px;
  transform: translateY(-50%);
  width: 66px;
  height: 100%;
  @media screen and (max-width: 1024px) {
    width: 65px;
    left: 23px;
  }
  @media screen and (max-width: 767px) {
    width: 37px;
    height: 17px;
    position: relative;
    top: 9px;
    left: inherit;
    transform: none;
  }
`;

const HeaderCenter = styled.div`
  z-index: 20;
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  max-width: 100%;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  z-index: 30;
  flex-direction: column;
  &:before,
  &:after {
    content: '';
    flex: 1 0 auto;
  }
`;

const TitleTop = styled.div`
  height: 7px;
  background-image: url('//img.autotropolis.net/content/images/carcom/userimages/cc-hr-star-mobile.png');
  background-repeat: no-repeat;
  background-position: center center;
  margin-bottom: 5px;
  width: 100px;
  @media screen and (max-width: 767px) {
    height: 4px;
    margin-bottom: 0;
  }
`;
const TitleWrapper = styled.div``;

const Title = styled.svg`
  width: 300px;
  height: 25px;
  margin-left: 0;
  @media screen and (max-width: 767px) {
    width: 169px;
    height: 16px;
    margin-left: 0;
    margin-top: 2px;
  }
`;

const Subtitle = styled.svg`
  width: 206px;
  height: 31px;
  position: relative;
  display: block;
  margin: auto auto 4px;
  @media screen and (max-width: 767px) {
    width: 169px;
    height: 26px;
    top: 4px;
  }
`;

const HeaderRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 20;
  @media screen and (max-width: 767px) {
    margin: 0;
    top: 0px;
  }
`;

const ImageRight = styled.div`
  width: 243px;
  height: 133px;
  background-position: -290px -335px;
  background-image: url('//static.car.com/cars/assets/img/bnr_images/memorial-day/carcom/flags.png');
  background-repeat: no-repeat;
  display: block;
  @media screen and (max-width: 767px) {
    width: 118px;
    height: 75px;
    background-position: -141px 0;
  }
`;

export {
  HeaderWrapper,
  HeaderLogo,
  HeaderBar,
  HeaderLeft,
  ImageLeft,
  HeaderDiagonal,
  HeaderCenter,
  TitleTop,
  TitleWrapper,
  Title,
  Subtitle,
  HeaderRight,
  ImageRight,
};
