// Definitions
import { IPlainObject } from '@/def/IPlainObject';

// Components
import SVGs from '../svgs';

// Styles
import {
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
          <FireworkLeft>
            <use xlinkHref="#fireworks-left" />
          </FireworkLeft>
          <HeaderDiagonal>
            <HeaderLogo>
              <use xlinkHref="#logo-carcom" />
            </HeaderLogo>
          </HeaderDiagonal>
        </HeaderLeft>
        <HeaderCenter>
          <TitleDesk>
            <use xlinkHref="#title-desk" />
          </TitleDesk>
          <TitleTablet>
            <use xlinkHref="#title-tablet" />
          </TitleTablet>
        </HeaderCenter>
        <HeaderRight>
          <FireworkRight>
            <use xlinkHref="#fireworks-right" />
          </FireworkRight>
        </HeaderRight>
      </HeaderWrapper>

      <SVGs />
    </>
  );
};

export default Header;
