// Packages
import styled from 'styled-components';

const TopContentWrapper = styled.div`
	padding: 20px 0;
	@media screen and ( min-width: 768px ) {
		padding: 40px 0 20px;
	}
`;
const TopTitle = styled.h1`
	font-size: 32px;
    font-weight: 700;
    line-height: 37px;
    text-align: center;
    color: #262c33;
    margin: 0 0 10px;
	@media screen and ( min-width: 768px ) {
		font-size: 48px;
		line-height: 55px;
	}
`;
const TopUser = styled.span`
	color: #ff7300;
`;
const TopSubTitle = styled.h2`
	color: #677484;
    font-size: 16px;
    line-height: 18px;
    text-align: center;
    margin: 0;
    font-weight: 400;
	@media screen and ( min-width: 768px ) {
		font-size: 21px;
		line-height: 24px;
	}
`;
const TopText = styled.p`
	color: #262c33;
    font-size: 16px;
    line-height: 18px;
    text-align: center;
	margin: 20px 0 10px;
	@media screen and ( min-width: 768px ) {
		margin: 30px 0 10px;
	}
`;
const TopDealers = styled.ul`
	list-style: none;
	padding: 0;
	text-align: center;
	margin: 0;
	li {
		border: 1px solid #dce3ef;
		border-radius: 5px;
		padding: 8px;
		width: 100%;
		margin-bottom: 10px;
		color: #262c33;
		font-size: 14px;
		line-height: 16px;
		text-align: center;
		@media screen and ( min-width: 768px ) {
			width: auto;
			margin: 0 10px 10px 0;
			display: inline-block;
			vertical-align: middle;
		}
	}
`;

export {
	TopContentWrapper, TopTitle, TopSubTitle, TopText, TopDealers, TopUser
};