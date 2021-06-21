import styled from 'styled-components';

const HeaderWrapper = styled.div`
  height: 96px;
  background-color: #051a49;
  position: relative;
  width: 100%;
  color: #fff;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.3);
  margin-bottom: 15px;

  @media screen and (max-width: 768px) {
    height: 76px;
    box-shadow: none;
  }
`;

const HeaderBar = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    background-color: #f1f1f1;
    z-index: 50;
    height: 20px;
    text-align: center;
    position: relative;
    display: block;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.3);
    svg {
      width: 30px;
      height: 15px;
      position: relative;
      top: 3px;
    }
  }
`;

const HeaderLogo = styled.svg``;
const HeaderFlag = styled.div``;
const HeaderFireworks = styled.div``;

const HeaderLeft = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;
  padding-left: 125px;
  height: 96px;
  width: 270px;
  ${HeaderFlag} {
    position: absolute;
    display: block;
    width: 88px;
    height: 96px;
    background-position: 0px -78px;
    background-image: url('//static.car.com/cars/assets/img/bnr_images/cc-icons.png');
    background-repeat: no-repeat;
  }
  ${HeaderFireworks} {
    position: absolute;
    width: 100px;
    height: 96px;
    left: 220px;
    display: block;
    svg {
      display: block;
      width: 100%;
      padding-top: 8px;
      height: 88px;
    }
  }
  @media screen and (max-width: 1024px) {
    ${HeaderFlag} {
      left: 96px;
    }
    ${HeaderFireworks} {
      left: 168px;
    }
  }
  @media screen and (max-width: 768px) {
    padding: 0;
    left: -8px;
    bottom: 0;
    top: auto;
    width: 120px;
    height: 56px;
    ${HeaderFlag} {
      left: 0;
      width: 65px;
      height: 56px;
      background-position: 8px -19px;
    }
    ${HeaderFireworks} {
      width: 65px;
      height: 56px;
      left: 51px;
      svg {
        padding-top: 1px;
        height: 92%;
      }
    }
  }
`;

const HeaderDiagonal = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  background-image: url('//static.car.com/cars/assets/img/bnr_images/cc-icons.png');
  background-repeat: no-repeat;
  background-position: -75px -177px;
  height: 96px;
  width: 158px;
  ${HeaderLogo} {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 75px;
    height: 100%;
  }

  @media screen and (max-width: 1024px) {
    width: 126px;
    background-position: -106px -177px;
    ${HeaderLogo} {
      width: 65px;
      left: 45%;
    }
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const HeaderCenter = styled.div`
  margin-left: auto;
  margin-right: auto;
  z-index: 1;
  max-width: 1440px;
  text-align: center;
  position: relative;
  height: 96px;

  @media screen and (max-width: 767px) {
    height: 56px;
  }
`;

const HeaderCenterWrapper = styled.div`
  position: relative;
  top: 50%;
  max-width: 240px;
  left: calc(50% + 33px);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  @media screen and (max-width: 991px) {
    max-width: 240px;
    left: calc(50% + 33px);
  }

  @media screen and (max-width: 767px) {
    width: 155px;
    top: 25px;
    left: 50%;
  }
`;

const HeaderTitle = styled.div`
  svg {
    width: 240px;
    height: 80px;
    margin: 0;
    padding-top: 12px;
  }

  @media screen and (max-width: 991px) {
    svg {
      width: 240px;
      height: 68px;
      margin: 0;
    }
  }

  @media screen and (max-width: 768px) {
    svg {
      width: 155px;
      height: 40px;
    }
  }
`;

const HeaderRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 5;
  overflow: hidden;
  display: flex;
  align-items: center;
  ${HeaderFlag} {
    width: 163px;
    height: 96px;
    background-position: -91px -78px;
    background-image: url('//static.car.com/cars/assets/img/bnr_images/cc-icons.png');
    background-repeat: no-repeat;
    display: block;
  }
  ${HeaderFireworks} {
    width: 100px;
    height: 96px;
    margin-right: -45px;
    display: block;
    svg {
      width: 100%;
      height: 97%;
    }
  }
  @media screen and (max-width: 1024px) {
    ${HeaderFlag} {
      width: 148px;
    }
    ${HeaderFireworks} {
      margin-right: -74px;
    }
  }
  @media screen and (max-width: 768px) {
    height: 56px;
    right: 0px;
    top: 20px;
    ${HeaderFlag} {
      width: 98px;
      height: 56px;
      background-position: -68px -18px;
    }
    ${HeaderFireworks} {
      width: 70px;
      height: 56px;
      svg {
        height: 94%;
        padding-top: 3px;
      }
    }
  }
`;

export {
  HeaderWrapper,
  HeaderBar,
  HeaderLogo,
  HeaderFlag,
  HeaderFireworks,
  HeaderLeft,
  HeaderDiagonal,
  HeaderCenter,
  HeaderCenterWrapper,
  HeaderTitle,
  HeaderRight,
};
