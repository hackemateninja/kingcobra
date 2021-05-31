// Definitions
import { IPlainObject } from '@/def/IPlainObject';

// Components
import SVGs from './svgs';

// Styles
import {
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
} from './style';

const Header: React.FC<IPlainObject> = () => {
  return (
    <>
      <HeaderWrapper>
        <HeaderBar>
          <HeaderLogo>
            <use xlinkHref="#logo-carcom" />
          </HeaderLogo>
        </HeaderBar>
        <HeaderLeft>
          <ImageLeft>
            <use xlinkHref="#fireworks-left" />
          </ImageLeft>
          <HeaderDiagonal>
            <HeaderLogo>
              <use xlinkHref="#logo-carcom" />
            </HeaderLogo>
          </HeaderDiagonal>
        </HeaderLeft>
        <HeaderCenter>
          <TitleTop></TitleTop>
          <TitleWrapper>
            <Subtitle>
              <use xlinkHref="#subtitle" />
            </Subtitle>
            <Title>
              <use xlinkHref="#title" />
            </Title>
          </TitleWrapper>
        </HeaderCenter>
        <HeaderRight>
          <ImageRight>
            <use xlinkHref="#fireworks-right" />
          </ImageRight>
        </HeaderRight>
      </HeaderWrapper>

      <SVGs />
    </>
  );
};

export default Header;
