// Packages
import styled from 'styled-components';

// Definitions
import { ThemeType } from '@/def/TTheme';

const FooterWrapper = styled.footer`
  padding: 10px 0 0;
  margin: 10px 0 0;
  @media screen and (min-width: 768px) {
    background: #fff;
    padding: 24px 0;
    border-top: 1px solid #d8d8d8;
    margin: 40px 0 0;
    > div {
      display: flex;
      align-items: center;
    }
  }
`;

const FooterContent = styled.div`
  margin: 0 -15px;
  border-top: 1px solid #d8d8d8;
  padding: 15px;
  background: #fff;

  @media screen and (min-width: 768px) {
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    max-width: 100%;
    border-top: 0;
    padding: 0;
    margin: 0;
  }
`;

const FooterText = styled.p<{ theme: ThemeType }>`
  color: #565656;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  margin: 10px 0 0;
  &:not(:last-child) {
    margin: 0 0 5px;
  }

  a {
    text-decoration: none;
    color: #565656;
    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }

  @media screen and (min-width: 768px) {
    &:last-child {
      padding-top: 10px;
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -150px;
        height: 1px;
        background: #9b9b9b;
        width: 300px;
      }
    }
  }
`;

export { FooterWrapper, FooterContent, FooterText };
