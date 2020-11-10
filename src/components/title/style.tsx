// Packages
import styled from 'styled-components';

// Definitions
import { ThemeType } from '../../definitions/TTheme';

const MainTitle = styled.h1<{ theme: ThemeType}>`
	font-weight: bold;
	font-size: 28px;
	line-height: 32px;
	color: ${props => props.theme.colors.primary};
	text-align: center;
	margin: 0;

	@media screen and ( min-width: 768px ) {
		font-size: 34px;
		line-height: 40px;
		text-align: left;
	}

	@media screen and ( min-width: 1024px ) {
		font-size: 40px;
		line-height: 48px;
	}
`;

export {
	MainTitle
};