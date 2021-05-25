// Packages
import styled from 'styled-components';

const ContainerWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
  max-width: ${(props) => props.theme.typage.container.sm};
  @media screen and (min-width: 768px) {
    max-width: ${(props) => props.theme.typage.container.md};
  }
  @media screen and (min-width: 1024px) {
    max-width: ${(props) => props.theme.typage.container.lg};
  }
`;

export default ContainerWrapper;
