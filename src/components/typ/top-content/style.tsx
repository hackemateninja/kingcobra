// Packages
import styled from 'styled-components';

// Definitions
import { ThemeType } from '@/def/TTheme';

const TopContentWrapper = styled.div`
  padding: 20px 0;
  @media screen and (min-width: 768px) {
    padding: 40px 0 20px;
  }
`;
const TopTitle = styled.h1<{ theme: ThemeType }>`
  font-size: ${(props) => props.theme.typage.font.size.title.xs};
  line-height: ${(props) => props.theme.typage.font.lineHeight.title.xs};
  font-weight: ${(props) => props.theme.typage.font.weight.title};
  text-align: center;
  color: ${(props) => props.theme.typage.colors.title};
  margin: 0 0 10px;
  @media screen and (min-width: 768px) {
    font-size: ${(props) => props.theme.typage.font.size.title.md};
    line-height: ${(props) => props.theme.typage.font.lineHeight.title.md};
  }
`;
const TopUser = styled.span<{ theme: ThemeType }>`
  color: ${(props) => props.theme.typage.colors.user};
`;
const TopSubTitle = styled.h2<{ theme: ThemeType }>`
  color: ${(props) => props.theme.typage.colors.subtitle};
  font-size: ${(props) => props.theme.typage.font.size.subtitle.xs};
  line-height: ${(props) => props.theme.typage.font.lineHeight.subtitle.xs};
  font-weight: ${(props) => props.theme.typage.font.weight.subtitle};
  text-align: center;
  margin: 0;
  @media screen and (min-width: 768px) {
    font-size: ${(props) => props.theme.typage.font.size.subtitle.md};
    line-height: ${(props) => props.theme.typage.font.lineHeight.subtitle.md};
  }
`;
const TopText = styled.p<{ theme: ThemeType }>`
  color: ${(props) => props.theme.typage.colors.text};
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  margin: 20px 0 10px;
  @media screen and (min-width: 768px) {
    margin: 30px 0 10px;
  }
`;
const TopDealers = styled.ul`
  list-style: none;
  padding: 0;
  text-align: center;
  margin: 0;
  li {
    border-radius: 5px;
    padding: 8px;
    width: 100%;
    margin-bottom: 10px;
    color: ${(props) => props.theme.typage.colors.text};
    font-size: 16px;
    line-height: 18px;
    text-align: center;
    font-weight: 700;
    @media screen and (min-width: 768px) {
      width: auto;
      margin: 0 10px 10px 0;
      display: inline-block;
      vertical-align: middle;
    }
    svg {
      width: 14px;
      height: 12px;
      margin-right: 6px;
    }
  }
`;

export { TopContentWrapper, TopTitle, TopSubTitle, TopText, TopDealers, TopUser };
