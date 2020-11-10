// Packages
import styled from 'styled-components';

// Definitions
import { ThemeType } from '../../../definitions/TTheme';

const BoxSubTitle = styled.h4<{ theme: ThemeType}>`
	display: none;

	@media screen and ( min-width: 768px ) {
		display: block;
		font-weight: normal;
		font-size: 14px;
		line-height: 18px;
		color: ${props => props.theme.colors.text};
		margin: 3px 0 0;
	}

	@media screen and ( min-width: 1024px ) {
		font-size: 16px;
		line-height: 24px;
	}
`;

export {
	BoxSubTitle
};