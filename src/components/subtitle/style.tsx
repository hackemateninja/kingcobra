// Packages
import styled from 'styled-components';

// Definitions
import { ThemeType } from '../../definitions/TTheme';

const SubTitleWrapper = styled.h2<{ theme: ThemeType}>`
	display: none;

	@media screen and ( min-width: 768px ) {
		margin: 5px 0 42px;
		font-weight: normal;
		font-size: 28px;
		line-height: 24px;
		color: ${props => props.theme.colors.text};
		font-size: 20px;
		display: block;
	}

	@media screen and ( min-width: 1024px ) {
		margin: 10px 0 42px;
		font-size: 30px;
		line-height: 38px;
	}
`;

export {
	SubTitleWrapper
};