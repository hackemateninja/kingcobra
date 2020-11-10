// Packages
import styled, { css } from 'styled-components';

const Dealer = styled.div<{ one?: boolean, all?: boolean }>`
	${props => props.all && css`
		background: #E6E6E6;
	`}
	${props => props.one && css`
		background: #F3F3F5;
		border-radius: 7px;
	`}
`;

const DealerInput = styled.input`
	position: absolute;
	top: 0;
	left: 0;
	margin: 0;
	opacity: 0;
	visibility: hidden;
	&:checked {
		~ label {
			svg {
				opacity: 1;
				transform: scale( 1 );
			}
		}
	}
`;

const DealerCheck = styled.span<{ one?: boolean, all?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 20px;
	-webkit-box-flex: 0;
	flex: 0 0 20px;
	max-width: 20px;
	margin: 2px 12px 0 0;
	border-radius: 5px;
	${props => !props.one && css`
		border: 1px solid #AEAEAE;
		background: #FFF;
	`}
`;

const DealerCheckIcon = styled.svg`
	fill: #154175;
	width: 12px;
	height: 12px;
	opacity: 0;
	transform: scale( .5 );
	transition: all ease .2s;
`;

const DealerLabel = styled.label<{ one?: boolean, all?: boolean }>`
	cursor: ${props => props.one ? 'default' : 'pointer'};
	display: flex;
	flex-basis: 0;
	flex-grow: 1;
	max-width: 100%;
	padding: ${props => props.one ? '8px' : '8px 16px'};
	${props => props.all && css`
		padding-top: 13px;
		padding-bottom: 13px;
	`}

	@media screen and ( min-width: 768px ) {
		padding: ${props => props.one ? '10px' : '10px 30px'};
		${props => props.all && css`
			padding-top: 20px;
			padding-bottom: 20px;
			margin-bottom: 10px;
		`}
		${props => props.one && css`
			align-items: center;
		`}
	}
`;

const DealerText = styled.span`
	flex-basis: 0;
	flex-grow: 1;
	max-width: 100%;
`;

const DealerName = styled.span<{ one?: boolean, all?: boolean }>`
	display: block;
	color: #4D4D4D;
	font-size: ${props => props.one ? '16px' : '14px'};
	line-height: ${props => props.one ? '24px' : '20px'};
	font-weight: ${props => props.one ? 'normal' : 'bold'};
	${props => props.all && css`
		font-size: 18px;
		line-height: 21px;
	`}

	@media screen and ( min-width: 768px ) {
		font-weight: bold;
		font-size: ${props => props.all ? '20px' : '16px'};
		line-height: 24px;
	}
`;

const DealerAddress = styled.span<{ one?: boolean, all?: boolean }>`
	margin-top: -1px;
	display: block;
	color: #6B6B6B;
	font-size: ${props => props.one ? '14px' : '12px'};
	line-height: ${props => props.one ? '18px' : '20px'};

	@media screen and ( min-width: 768px ) {
		font-size: 14px;
		line-height: 18px;
		${props => props.all && css`
			display: none;
		`}
	}
`;

export {
	Dealer,
	DealerInput,
	DealerCheck,
	DealerCheckIcon,
	DealerLabel,
	DealerText,
	DealerName,
	DealerAddress
}