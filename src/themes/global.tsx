// Packages
import { createGlobalStyle } from 'styled-components';

// Definitions
import { ThemeType } from '../definitions/TTheme';

const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
	:root {
		min-width: 320px;
		font-size: 16px;
		font-family: ${props => props.theme.fontFamily}, sans-serif;
	}
	* {
		position: relative;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
	html {
		height: 100%;
	}
	body {
		margin: 0;
		padding: 0;
		min-height: 100%;
		background-color: ${props => props.theme.colors.background};
		-webkit-tap-highlight-color: transparent;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	input, select {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
	}

	select::-ms-expand { display: none; }

	input, select, button {
		font-family: ${props => props.theme.fontFamily}, sans-serif;
	}

	a {
		color: ${props => props.theme.colors.primaryLight};
	}

	#__next {
		position: static;
	}
`;

export default GlobalStyles;