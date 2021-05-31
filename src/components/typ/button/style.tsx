// Packages
import styled from 'styled-components';

// Definitions
import { ThemeType } from '@/def/TTheme';

const ButtonWrapper = styled.button<{ theme: ThemeType }>`
  cursor: pointer;
  font-weight: 700;
  font-size: 24px;
  line-height: 50px;
  color: #fff;
  height: 50px;
  width: 100%;
  background-color: ${(props) => props.theme.typage.background.button.default};
  border: 0;
  border-radius: 5px;
  transition: all ease 0.3s;
  outline: none;
  &:hover {
    background-color: ${(props) => props.theme.typage.background.button.hover};
  }
  &:active {
    background-color: ${(props) => props.theme.typage.background.button.hover};
  }
`;

const ButtonSpan = styled.span`
  color: #fff;
  font-size: 20px;
  font-weight: bold;

  @media screen and (min-width: 768px) {
    font-size: 26px;
  }
`;

export { ButtonWrapper, ButtonSpan };
