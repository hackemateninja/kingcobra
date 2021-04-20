// Packages
import styled, { css } from "styled-components";

// Definitions
import { ThemeType } from "@/def/TTheme";

const TextWrapper = styled.p<{
  theme: ThemeType;
  center?: boolean;
  text?: string;
}>`
  color: #4d4d4d;
  font-size: ${(props) => props.theme.font.size.default};
  line-height: ${(props) => props.theme.font.lineHeight.default};
  margin: 0;
  ${(props) =>
    props.center &&
    css`
      text-align: center;
    `}
  ${(props) =>
    props.text === "authorized" &&
    css`
      font-size: 14px;
      line-height: 18px;
      margin-top: 20px;
      margin-bottom: 40px;
      span {
        display: block;
      }
      @media screen and (min-width: 768px) {
        font-size: 16px;
        line-height: 24px;
        max-width: 285px;
        margin: 20px auto 0;
      }
      @media screen and (min-width: 1024px) {
        max-width: 380px;
      }
    `}
	${(props) =>
    props.text === "helping" &&
    css`
      font-size: 16px;
      line-height: 18px;
      color: #154175;
      font-weight: 400;
      @media screen and (min-width: 768px) {
        max-width: 313px;
        margin: 0 auto;
      }
    `}
`;

export { TextWrapper };
