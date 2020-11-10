// Packages
import styled, { css } from 'styled-components';

const TextWrapper = styled.p<{ center?: boolean }>`
	color: #4D4D4D;
	font-size: 16px;
	line-height: 24px;
	margin: 0;
	${props => props.center && css`
		text-align: center;
	`}
`;

export {
	TextWrapper
}