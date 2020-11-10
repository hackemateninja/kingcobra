// Packages
import styled from 'styled-components';

const HeaderWrapper = styled.header`
	height: 50px;
    width: 100%;
    background-color: #2b3b53;
	& div {
		height: 50px;
		display: flex;
		align-items: center;
	}
	@media screen and ( min-width: 768px ) {
		height: 60px;
		& div {
			height: 60px;
		}
	}
`;

const HeaderImg = styled.img`
	width: ${props => props.theme.typHeaderLogo.logoHeight};
    height: auto;
    margin: 0 auto;
	@media screen and ( min-width: 768px ) {
		margin: 0;
	}
`;

export {
	HeaderWrapper, HeaderImg
};