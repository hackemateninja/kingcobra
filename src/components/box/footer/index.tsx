// Packages
import React from 'react';

// Definitions
import { IBoxFooter } from '../../../definitions/IBox';

// Components
import Text from '../../text';

// Styles
import {BoxFooterWrapper, BoxFooterProtect, BoxFooterIcon, BoxFooterTCPA } from './style';

const BoxFooter: React.FC<IBoxFooter> = ( props ) => {
	return (
		<>
			{props.step === '1' &&
				<BoxFooterWrapper>
					<Text center={true}>Search <strong>Authorized</strong> Dealers Ready to Offer You Their <strong>Lowest</strong> Price!</Text>
				</BoxFooterWrapper>
			}
			{props.step === '3' &&
				<BoxFooterWrapper>
					<BoxFooterProtect>
						<BoxFooterIcon><use xlinkHref="#icon-security" /></BoxFooterIcon>
						We protect your personal information.
					</BoxFooterProtect>
					<BoxFooterTCPA>
						By clicking "Get Pricing" I accept and agree to be bound by your <a href="#terms">Terms of Use</a> and acknowledge receipt of your <a href="#privacy">Privacy Policy</a>.
					</BoxFooterTCPA>
				</BoxFooterWrapper>
			}
		</>
	);
};

export default BoxFooter;