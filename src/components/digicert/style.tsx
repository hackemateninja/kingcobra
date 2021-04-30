import styled from 'styled-components';

// Definitions
import { ThemeType } from '@/def/TTheme';

const DigicertDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  justify-content: center;
  font-size: 10px;
  padding-bottom: 15px;
  height: 53px;
  width: 108px;

  div {
    img {
      width: 55px !important;
      height: auto !important;
    }
  }
  span {
    margin-top: 10px !important;
  }

  @media screen and (min-width: 768px) {
    padding: 0;
    margin-right: 20px;
  }
`;

export { DigicertDiv };
