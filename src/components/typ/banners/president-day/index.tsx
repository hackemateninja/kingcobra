// Definitions
import { IPlainObject } from "@/def/IPlainObject";

// Components
import SVGs from "../svgs";

// Styles
import {
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
} from "./style";

const Header: React.FC<IPlainObject> = () => {
  return (
    <>
      <HeaderWrapper>
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
