// Packages
import styled from 'styled-components';

// Definitions
import { ThemeType } from '../../../../definitions/TTheme';

const HeaderWrapper = styled.header<{ theme: ThemeType }>`
  height: 55px;
  position: relative;
  width: 100%;
  color: #fff;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.3);
  margin-bottom: 15px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  padding: 0 126px 0 225px;
  box-sizing: border-box;
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    margin-top: -40vw;
    left: 0;
    width: 100%;
    height: 80vw;
    background: #002664;
    background: radial-gradient(circle, #204684 0%, #002664 100%, #002664 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#204684', endColorstr='#002664',GradientType=1 );
  }
  @media screen and (max-width: 1024px) {
    padding: 0 0 0 58px;
  }
  @media screen and (max-width: 767px) {
    height: 46px;
    padding: 0 0 0 72px;
    box-shadow: none;
    margin-bottom: -22px;
  }
`;

const HeaderLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 5;
`;

const FireworkLeft = styled.svg`
  position: absolute;
  top: 2px;
  left: 110px;
  width: 71px;
  height: 55px;
  @media screen and (max-width: 1024px) {
    left: 56px;
  }
  @media screen and (max-width: 767px) {
    top: 2px;
    left: 68px;
    width: 70px;
    height: 46px;
  }
`;

const HeaderDiagonal = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  background-image: url('//static.car.com/cars/assets/img/bnr_images/cc-icons.png');
  background-repeat: no-repeat;
  background-position: -102px -177px;
  height: 55px;
  width: 130px;
  @media screen and (max-width: 1024px) {
    width: 73px;
    background-position: -158px -177px;
  }
  @media screen and (max-width: 767px) {
    background-position: -144px -177px;
    height: 46px;
    width: 90px;
  }
`;

const HeaderLogo = styled.svg`
  position: absolute;
  top: 50%;
  left: 34px;
  transform: translateY(-50%);
  width: 51px;
  height: 100%;
  @media screen and (max-width: 1024px) {
    width: 39px;
    left: 12px;
  }
  @media screen and (max-width: 767px) {
    left: 14px;
    width: 50px;
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
  &:before,
  &:after {
    content: '';
    flex: 1 0 auto;
  }
`;

const TitleDesk = styled.svg`
  width: 763px;
  height: 28px;
  display: block;
  @media screen and (max-width: 1024px) {
    width: 489px;
    height: 18px;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const TitleTablet = styled.svg`
  display: none;
  @media screen and (max-width: 767px) {
    display: block;
    width: 140px;
    height: 27px;
  }
`;

const HeaderRight = styled.div`
  position: absolute;
  right: 0px;
  top: 0;
  z-index: 20;
  @media screen and (max-width: 767px) {
    right: 0px;
  }
`;

const FireworkRight = styled.svg`
  margin-top: 6px;
  width: 64px;
  height: 55px;
  @media screen and (max-width: 767px) {
    margin-top: 3px;
    width: 64px;
    height: 46px;
  }
`;

export {
  HeaderWrapper,
  HeaderLogo,
  HeaderLeft,
  FireworkLeft,
  HeaderDiagonal,
  HeaderCenter,
  TitleDesk,
  TitleTablet,
  HeaderRight,
  FireworkRight,
};
