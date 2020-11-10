// Packages
import styled from 'styled-components';

// Definitions
import { ThemeType } from '../../definitions/TTheme';

const ButtonWrapper = styled.button<{ theme: ThemeType}>`
	outline: 0;
	height: 50px;
	width: 100%;
	border: 1px solid ${props => props.theme.button.border};
	border-radius: 6px;
	background: ${props => props.theme.button.background};
	box-shadow: 0 20px 20px -20px rgba( 0, 0, 0, .7 );
	text-align: center;
	transition: all 300ms ease;
	cursor: pointer;
	&:before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: ${props => props.theme.button.hover};
		opacity: 0;
		border-radius: 3px;
		transition: all 300ms ease;
	}
	&:hover {
		&:before {
			opacity: 1;
		}
	}
	&:active {
		transform: translateY( 2px );
		box-shadow: 0 20px 10px -20px rgba( 0, 0, 0, .7 );
	}
`
const ButtonSpan = styled.span<{ theme: ThemeType}>`
	color: #FFF;
	font-size: 20px;
	font-weight: bold;

	@media screen and ( min-width: 768px ) {
		font-size: 26px;
	}
`;

export {
	ButtonWrapper,
	ButtonSpan
};