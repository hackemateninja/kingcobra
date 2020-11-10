// Packages
import React, { useState } from 'react';

// Definitions
import { IPlainObject } from '../../definitions/IPlainObject';

// Components
import Container from '../container';

// Styles
import { FooterWrapper, FooterCert, FooterContent, FooterText } from './style';

const Footer: React.FC<IPlainObject> = ( props ) => {
	const date = new Date();
	const [year] = useState<number>( date.getFullYear() );

	return (
		<FooterWrapper>
			<Container>
				<FooterCert>
					DigiCert Here
				</FooterCert>
				<FooterContent>
					<FooterText>This is a free service with absolutely no obligation.</FooterText>
					<FooterText><a href="#privacy">Privacy Policy</a> | <a href="#dont-sell">Do Not Sell My Personal Information</a> | <a href="#terms">Terms of Use</a></FooterText>
					<FooterText>©{year} AutoWeb Inc. All Rights Reserved.</FooterText>
				</FooterContent>
			</Container>
		</FooterWrapper>
	);
};

export default Footer;