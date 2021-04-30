// Packages
import styled from 'styled-components';

// Definitions
import { ThemeType } from '@/def/TTheme';

const BoxTitleDesktop = styled.h3<{ theme: ThemeType }>`
  font-size: ${(props) => props.theme.font.size.box.title.xs};
  font-weight: bold;
  line-height: ${(props) => props.theme.font.lineHeight.box.title.xs};
  color: ${(props) => props.theme.colors.text};
  margin: 0;
  display: none;

  @media screen and (min-width: 768px) {
    font-size: ${(props) => props.theme.font.size.box.title.md};
    line-height: ${(props) => props.theme.font.lineHeight.box.title.md};
    display: block;
  }
`;

const BoxTitleMobile = styled.h2<{ theme: ThemeType }>`
  font-size: ${(props) => props.theme.font.size.box.title.xs};
  font-weight: bold;
  line-height: ${(props) => props.theme.font.lineHeight.box.title.xs};
  color: ${(props) => props.theme.colors.text};
  margin: 0;

  @media screen and (min-width: 768px) {
    font-size: ${(props) => props.theme.font.size.box.title.md};
    line-height: ${(props) => props.theme.font.lineHeight.box.title.md};
    display: none;
  }
`;

export { BoxTitleDesktop, BoxTitleMobile };
