// Packages
import styled from 'styled-components';

// Definitions
import { ThemeType } from '@/def/TTheme';

const HeaderWrapper = styled.header<{ theme: ThemeType }>`
  height: ${(props) => props.theme.typage.header.height.xs};
  width: 100%;
  background-color: ${(props) => props.theme.typage.background.header.default};
  & div {
    height: ${(props) => props.theme.typage.header.height.xs};
    display: flex;
    align-items: center;
  }
  @media screen and (min-width: 768px) {
    height: ${(props) => props.theme.typage.header.height.md};
    & div {
      height: ${(props) => props.theme.typage.header.height.md};
    }
  }
`;

const HeaderImg = styled.svg<{ theme: ThemeType }>`
  width: ${(props) => props.theme.typage.logo.width.xs};
  height: ${(props) => props.theme.typage.logo.height.xs};
  margin: ${(props) => props.theme.typage.logo.margin.xs};
  @media screen and (min-width: 768px) {
    margin: ${(props) => props.theme.typage.logo.margin.md};
  }
`;

export { HeaderWrapper, HeaderImg };
