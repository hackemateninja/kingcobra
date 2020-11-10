// Packages
import styled from 'styled-components';

// Definitions
import { ThemeType } from '../../definitions/TTheme';

const HeaderWrapper = styled.header<{ theme: ThemeType}>`
	overflow: hidden;
	height: ${props => props.theme.header.heightMobile};
	background: ${props => props.theme.header.background};
	margin: ${props => props.theme.header.marginMobile};
	> div {
		display: flex;
		align-items: center;
		justify-content: center;
		height: inherit;
	}
	
	@media screen and ( min-width: 768px ) {
		height: ${props => props.theme.header.heightDesktop};
		margin: ${props => props.theme.header.marginDesktop};
	}
`;

const HeaderLogo = styled.svg`
	width: ${props => props.theme.logo.widthMobile};
	height: ${props => props.theme.logo.heightMobile};
	
	@media screen and ( min-width: 768px ) {
		width: ${props => props.theme.logo.widthDesktop};
		height: ${props => props.theme.logo.heightDesktop};
		margin: 0 90px 0 0;
	}

	@media screen and ( min-width: 1024px ) {
		margin: 0 120px 0 0;
	}
`;

const HeaderContent = styled.div`
	display: none;
	
	@media screen and ( min-width: 768px ) {
		display: block;
		-ms-flex-preferred-size: 0;
		flex-basis: 0;
		-webkit-box-flex: 1;
		-ms-flex-positive: 1;
		flex-grow: 1;
		max-width: 100%;
	}
`;

const HeaderTitle = styled.p<{ theme: ThemeType}>`
	display: flex;
	align-items: center;
	margin: 0;
	font-size: 32px;
	font-weight: bold;
	text-transform: uppercase;
	height: 78px;
	color: ${props => props.theme.colors.primary};
`;

const HeaderTitleBox = styled.span<{ theme: ThemeType}>`
	border: 3px solid ${props => props.theme.colors.primary};
	border-radius: 3px;
	padding: 4px 6px 3px;
`;

const HeaderText = styled.p`
	display: flex;
	align-items: center;
	height: 27px;
	margin: 0;
	background: ${props => props.theme.header.decorationBackground};
	color: #FFF;
	font-size: 18px;
	&:before, &:after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		background: ${props => props.theme.header.decorationBackground};
	}
	&:before {
		width: 60px;
		left: -40px;
		transform: skew( -30deg );
	}
	&:after {
		width: 3000px;
		right: -3000px;
	}
`;

export {
	HeaderWrapper,
	HeaderLogo,
	HeaderContent,
	HeaderTitle,
	HeaderText,
	HeaderTitleBox
};