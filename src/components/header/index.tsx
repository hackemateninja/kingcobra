// Packages
import React from 'react';
import { useSelector } from 'react-redux';

// Definitions
import { IPlainObject } from '../../definitions/IPlainObject';

// Components
import Container from '../container';
import { RootState } from '../../../store/reducers';

// Styles
import { HeaderWrapper, HeaderLogo, HeaderContent, HeaderTitle, HeaderText, HeaderTitleBox } from './style';

const Header: React.FC<IPlainObject> = (props) => {
	let month = useSelector((state: RootState) => state.monthData);
	return (
		<HeaderWrapper>
			<Container>
				<HeaderLogo><use xlinkHref="#logo" /></HeaderLogo>
				<HeaderContent>
					<HeaderTitle>Huge&nbsp;<HeaderTitleBox>{month}</HeaderTitleBox>&nbsp;Closeout</HeaderTitle>
					<HeaderText><span>Car enthusiasts at your service</span></HeaderText>
				</HeaderContent>
			</Container>
		</HeaderWrapper>
	);
};

export default Header;