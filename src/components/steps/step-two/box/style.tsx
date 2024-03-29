import styled, { css } from 'styled-components';
import { TextWrapper } from '@/comp/text/style';

const StepBoxWrapper = styled.div<{ one?: boolean; active?: string }>`
  box-shadow: 0 2px 11px 1px rgba(0, 0, 0, 0.37);
  border-radius: 7px;
  overflow: hidden;

  ${TextWrapper} {
    color: ${(props) => props.theme.colors.primary};
    margin: 15px auto 0;
  }

  ${(props) =>
    !props.one
      ? css`
          > div {
            > div {
              box-shadow: none;
              border-radius: 0;
            }
          }

          .s2-dealers,
          .s2-form {
            width: 100%;
          }
          .s2-dealers-enter {
            position: absolute;
            transform: translateX(-100%);
          }
          .s2-dealers-enter-active {
            transform: translateX(0%);
            transition: all ease 0.3s;
          }
          .s2-dealers-exit {
            position: absolute;
          }
          .s2-dealers-exit-active {
            transform: translateX(-100%);
            transition: all ease 0.3s;
          }

          .s2-form-enter {
            transform: translateX(100%);
          }
          .s2-form-enter-active {
            transform: translateX(0%);
            transition: all ease 0.3s;
          }
          .s2-form-exit {
          }
          .s2-form-exit-active {
            transform: translateX(100%);
            transition: all ease 0.3s;
          }
        `
      : css`
          > div {
            width: 100%;
            box-shadow: none;
            border-radius: 0;
            transition: transform ease 0.3s;
            &:last-child {
              position: absolute;
              transform: translateX(100%);
              visibility: hidden;
            }
            ${props.active === 'form' &&
            css`
              &:first-child {
                position: absolute;
                transform: translateX(-100%);
              }
              &:last-child {
                position: relative;
                transform: translateX(0);
                visibility: visible;
              }
            `}
          }

          @media screen and (min-width: 768px) {
            ${TextWrapper} {
              margin: 15px auto -5px;
            }

            > div {
              transition: none;
              &:first-child {
                button {
                  display: none;
                }
              }
              &:not(:first-child) {
                &:before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 30px;
                  right: 30px;
                  height: 1px;
                  background: #b7b9c6;
                }
              }
              &:first-child,
              &:last-child {
                position: relative;
                transform: translateX(0);
                visibility: visible;
              }
            }
          }
        `}
`;

export { StepBoxWrapper };
