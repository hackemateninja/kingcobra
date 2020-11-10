// Packages
import styled from 'styled-components';
import { ThemeType } from '../../definitions/TTheme';

const QuotesWapper = styled.div`
	overflow: hidden;
	user-select: none;
	margin: 24px 0 0;
`;

const QuotesScroll = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	overflow: auto;
	padding-bottom: 50px;
	margin-bottom: -65px;
	-webkit-overflow-scrolling: touch;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;

	@media (hover: none) and (pointer: coarse) {
		padding-bottom: 50px;
		margin-bottom: -50px;
	}
`;

const QuotesNav = styled.div<{ active: number }>`
	display: flex;
	justify-content: center;
	margin: 10px 0 0;
	> div {
		&:nth-child( ${props => props.active} ) {
			transform: scale( .8 );
			background: #AEAEAE;
		}
	}
`;

const Quote = styled.div<{ theme: ThemeType }>`
	height: 100%;
	display: flex;
	padding: 15px;
	background: ${props => props.theme.quote.background};
	border-radius: 7px;
	min-width: 100%;
	scroll-snap-align: start;
	&:not(:last-child) {
		margin: 0 15px 0 0;
	}
`;

const QuotePhoto = styled.img`
	width: 46px;
	height: 46px;
	border-radius: 46px;
	margin-right: 15px;
`;

const QuoteContent = styled.div`
	flex-basis: 0;
	flex-grow: 1;
	max-width: 100%;
`;

const QuoteText = styled.blockquote`
	margin: 0 0 5px;
	font-style: italic;
	color: ${props => props.theme.quote.text};
	font-size: 14px;
	line-height: 20px;

	@media screen and ( min-width: 768px ) {
		margin: 0 0 10px;
		font-size: 16px;
	}
`;

const QuoteName = styled.p`
	margin: 0;
	font-size: 12px;
	line-height: 14px;
	color: ${props => props.theme.quote.name};
`;

const QuoteDot = styled.div`
	cursor: pointer;
	width: 12px;
	height: 12px;
	border-radius: 12px;
	background: #D8D8D8;
	transform: scale( .5 );
	overflow: hidden;
	text-indent: -100px;
	transition: all ease .2s;
	&:not(:last-child) {
		margin-right: 9px;
	}
`;

export {
	QuotesWapper,
	QuotesScroll,
	QuotesNav,
	Quote,
	QuotePhoto,
	QuoteContent,
	QuoteText,
	QuoteName,
	QuoteDot
}