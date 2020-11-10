import styled, { css, keyframes } from 'styled-components';

const bounce = keyframes`
	0%, 20%, 50%, 80%, 100% {
		transform: translateX( 0 );
	}
	40% {
		transform: translateX( -6px );
	}
	60% {
		transform: translateX( -4px );
	}
`;

const FormElement = styled.div<{ active: boolean, cue: boolean, error: boolean }>`
	margin-bottom: 15px;
	&:before {
		content: '';
		width: 100%;
		height: ${props => props.active ? '40px' : '40px'};
		border-radius: 6px;
		${props => !props.cue && !props.error && css`
			border: 1px solid #5e7fb2;
		`}
		${props => props.cue && css`
			border: 1px solid #3F81CE;
		`}
		${props => props.error && css`
			border: 1px solid #E31818;
		`}
		position: absolute;
		top: 0;
		left: 0;
		box-sizing: border-box;
		transform: ${props => props.active ? 'none' : 'none'};
		transition: all cubic-bezier( .68, -.55, .265, 1.55 ) .3s;
	}
`;

const FormElementArrow = styled.span<{ focus: boolean }>`
	position: absolute;
	top: 16px;
	right: 15px;
	width: 0;
	height: 0;
	border-left: 8px solid transparent;
	border-right: 8px solid transparent;
	border-top: 8px solid ${props => props.focus ? '#5e7fb2' : '#5e7fb2'};
	transform: ${props => props.focus ? 'rotate( -180deg )' : 'none'};
	transition: all cubic-bezier( .68, -.55, .265, 1.55 ) .3s;
`;

const FormElementLabel = styled.label<{ active: boolean, icon?: boolean, select?: boolean }>`
	cursor: text;
	font-size: 14px;
	line-height: 18px;
	color: #6B6B6B;
	position: absolute;
	top: 17px;
	left: ${props => props.icon ? '35px' : '18px'};
	transform-origin: left;
	backface-visibility: hidden;
	transform: ${props => props.active ? 'translateY(-10px) scale(.8) perspective(1px) translateZ(0)' : 'none'};
	transition: all cubic-bezier( .68, -.55, .265, 1.55 ) .3s;
	display: none;
	${props => props.active && props.icon && css`
		transform: translateX( -17px ) translateY(-10px) scale(.8) perspective(1px) translateZ(0);
	`}
	${props => props.select && css`
		opacity: ${props.active ? '1' : '0'};
	`}
`;

const FormElementIcon = styled.svg<{ active: boolean }>`
	pointer-events: none;
	position: absolute;
	top: 21px;
	left: 18px;
	width: 12px;
	height: 12px;
	transition: all cubic-bezier( .68, -.55, .265, 1.55 ) .3s;
	transform: ${props => props.active ? 'translateY( 7px )' : 'none'};
`;

const FormElementCue = styled.svg`
	position: absolute;
	top: 16px;
	left: -8px;
	width: 21px;
	height: 21px;
	animation: ${bounce} ease 2s infinite;
`;

const FormElementMessage = styled.span`
	font-size: 12px;
	line-height: 16px;
	color: #E31818;
`;

const Element = styled.input<{ icon?: boolean, as?: string, active?: boolean }>`
	outline: none;
	border: 0;
	background: transparent;
	width: 100%;
	height: 40px;
	${props => props.icon === undefined && props.as === 'select' && css`
		padding: ${props.active ? '0 10px' : '0 10px'};
	`}
	${props => props.icon && css`
		padding: 17px 40px 0 35px;
	`}
	color: #4d4d4d;
	font-size: ${props => props.active ? '16px' : '16px'};
	transition: all cubic-bezier( .68, -.55, .265, 1.55 ) .3s;
	option {
		font-size: 16px;
	}
`;

export {
	FormElement,
	FormElementArrow,
	FormElementLabel,
	FormElementIcon,
	FormElementCue,
	FormElementMessage,
	Element
}