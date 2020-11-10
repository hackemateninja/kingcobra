// Packages
import styled from 'styled-components';

// Definitions
import { ThemeType } from '../../../definitions/TTheme';

const BoxTitle = styled.h3<{ theme: ThemeType}>`
	font-size: 18px;
	font-weight: bold;
	line-height: 26px;
	color: ${props => props.theme.colors.text};
	margin: 0;

	@media screen and ( min-width: 768px ) {
		font-size: 24px;
		line-height: 28px;
	}
`;

export {
	BoxTitle
};