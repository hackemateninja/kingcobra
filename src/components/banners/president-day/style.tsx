// Packages
import styled from "styled-components";

// Definitions
import { ThemeType } from "../../../definitions/TTheme";

const HeaderWrapper = styled.header<{ theme: ThemeType }>`
  height: 95px;
  position: relative;
  width: 100%;
  color: #fff;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.3);
  margin-bottom: 15px;
  overflow: hidden;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  padding: 0 126px 0 225px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  &:before {
    content: "";
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
  @media screen and (max-width: 767px) {
    height: 96px;
    box-shadow: none;
    margin-bottom: 0;
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

const FireworkLeft = styled.svg`
  position: absolute;
  top: -2px;
  left: 108px;
  width: 120px;
  height: 107px;
  @media screen and (max-width: 767px) {
    top: 29px;
    width: 87px;
    height: 77px;
    left: -3px;
  }
`;

const HeaderDiagonal = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  background-image: url("//static.car.com/cars/assets/img/bnr_images/cc-icons.png");
  background-repeat: no-repeat;
  background-position: -104px -177px;
  height: 96px;
  width: 126px;
  @media screen and (max-width: 1024px) {
    width: 126px;
    background-position: -106px -177px;
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
  &:before,
  &:after {
    content: "";
    flex: 1 0 auto;
  }
`;

const TitleDesk = styled.svg`
  width: 889px;
  height: 33px;
  display: block;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const TitleTablet = styled.svg`
  display: none;
  @media screen and (max-width: 1024px) {
    display: block;
    width: 268px;
    height: auto;
  }
  @media screen and (max-width: 767px) {
    width: 179px;
    height: 34px;
  }
`;

const HeaderRight = styled.div`
  position: absolute;
  right: 10px;
  top: 0;
  z-index: 20;
  @media screen and (max-width: 767px) {
    margin: 0;
    top: 0px;
  }
`;

const FireworkRight = styled.svg`
  margin-top: -25px;
  width: 111px;
  height: 157px;
  @media screen and (max-width: 767px) {
    width: 87px;
    height: auto;
    margin-top: -5px;
    display: block;
    margin-right: -8px;
  }
`;

export {
  HeaderWrapper,
  HeaderLogo,
  HeaderBar,
  HeaderLeft,
  FireworkLeft,
  HeaderDiagonal,
  HeaderCenter,
  TitleDesk,
  TitleTablet,
  HeaderRight,
  FireworkRight,
};
