// SVGs
import SVGs from './svgs';

// Styles
import {
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
} from './style';

const FourthJuly: React.FC = () => {
  return (
    <HeaderWrapper>
      <HeaderBar>
        <HeaderLogo>
          <use xlinkHref="#logo-carcom" />
        </HeaderLogo>
      </HeaderBar>
      <HeaderLeft>
        <HeaderDiagonal>
          <HeaderLogo>
            <use xlinkHref="#logo-carcom" />
          </HeaderLogo>
        </HeaderDiagonal>
        <HeaderFlag />
        <HeaderFireworks>
          <svg>
            <use xlinkHref="#fireworks-left"></use>
          </svg>
        </HeaderFireworks>
      </HeaderLeft>
      <HeaderCenter>
        <HeaderCenterWrapper>
          <HeaderTitle>
            <svg>
              <use xlinkHref="#clearance-title-device" />
            </svg>
          </HeaderTitle>
        </HeaderCenterWrapper>
      </HeaderCenter>
      <HeaderRight>
        <HeaderFireworks>
          <svg>
            <use xlinkHref="#fireworks-right"></use>
          </svg>
        </HeaderFireworks>
        <HeaderFlag />
      </HeaderRight>
      <SVGs />
    </HeaderWrapper>
  );
};

export default FourthJuly;
