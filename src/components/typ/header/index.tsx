// Packages
import React from 'react';

// Components
import Container from '../container';

// Styles
import { HeaderWrapper, HeaderImg } from './style';

const Header: React.FC = () => {
	return (
		<HeaderWrapper>
			<Container>
				<HeaderImg alt="Carcom Logo" src="/carcom-logo.png" />
			</Container>
		</HeaderWrapper>
	);
};

export default Header;