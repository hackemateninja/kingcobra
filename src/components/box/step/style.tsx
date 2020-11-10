// Packages
import styled from 'styled-components';

// Definitions
import { ThemeType } from '../../../definitions/TTheme';

const StepWrapper = styled.div<{ theme: ThemeType}>`
	background: ${props => props.theme.colors.primary};
	color: #FFF;
	border-radius: 4px;
	height: 28px;
	width: 86px;
	line-height: 16px;
	font-size: 12px;
	text-align: center;
	font-weight: 300;
	padding: 6px;
  margin-bottom: 5px;
	
	@media screen and ( min-width: 768px ) {
		margin-bottom: 15px;
	}

`;

export {
	StepWrapper
};