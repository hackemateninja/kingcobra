// Packages
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';

// Components
import Container from '../container';

// Styles
import { HeaderWrapper, HeaderLogo, HeaderContent, HeaderTitle, HeaderText, HeaderTitleBox } from './style';

const Header: React.FC<IPlainObject> = (props) => {
  const themeContext = useContext(ThemeContext);
  const { month } = props;

  return (
    <HeaderWrapper>
      <Container>
        <HeaderLogo>
          <use xlinkHref={themeContext.logo.filename} />
        </HeaderLogo>
        <HeaderContent>
          <HeaderTitle>
            Huge&nbsp;<HeaderTitleBox>{month}</HeaderTitleBox>&nbsp;Closeout
          </HeaderTitle>
          <HeaderText>
            <span>Car enthusiasts at your service</span>
          </HeaderText>
        </HeaderContent>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
