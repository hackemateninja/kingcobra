// Packages
import styled, { keyframes, css } from 'styled-components';

// Definitions
import { ThemeType } from '@/def/TTheme';

const loader = keyframes`
	0% {
		stroke-dashoffset: 120;
	}
	100% {
		stroke-dashoffset: -120;
	}
`;

const LoaderWrapper = styled.div<{ type?: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -20px;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.type === 'button' &&
    css`
      background: transparent;
      box-shadow: none;
      svg {
        width: 30px;
        height: 30px;
        stroke: #fff;
      }
    `};
  ${(props) =>
    props.type === 'dealers' &&
    css`
      position: relative;
      background: transparent;
      box-shadow: none;
      margin: 20px auto;
      top: 0;
      left: 0;
      svg {
        width: 50px;
        height: 50px;
        stroke: #016bff;
      }
    `};
`;

const LoaderIcon = styled.svg<{ theme: ThemeType }>`
  width: 20px;
  height: 20px;
  stroke: ${(props) => props.theme.colors.primary};
  transform: rotate(-90deg);
  stroke-dasharray: 120;
  animation: ${loader} ease 1s infinite;
`;

export { LoaderWrapper, LoaderIcon };
