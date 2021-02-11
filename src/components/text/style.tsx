// Packages
import styled, { css } from "styled-components";

// Definitions
import { ThemeType } from "@/def/TTheme";

const TextWrapper = styled.p<{ theme: ThemeType; center?: boolean; text?: string }>`
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
    `}
`;

export { TextWrapper };
