// Packages
import styled from 'styled-components';

// Definitions
import { ThemeType } from '../../definitions/TTheme';

const BoxWrapper = styled.div<{ theme: ThemeType }>`
	margin: 0;
	border-radius: 7px;
	box-shadow: 0 2px 11px 1px rgba( 0, 0, 0, .37 );
	background-color: #fff;
	padding: 15px;
	color: ${props => props.theme.colors.text};

	@media screen and ( min-width: 768px ) {
		padding: 20px 30px;
	}
`;

const BoxHeader = styled.div`
	margin-bottom: 15px;
`;

export {
	BoxWrapper,
	BoxHeader
};