// Packages
import styled from 'styled-components';

const ButtonWrapper = styled.button`
	cursor: pointer;
    font-weight: 700;
    font-size: 24px;
    line-height: 50px;
    color: #fff;
    height: 50px;
    width: 100%;
    background-color: #2b3b53;
    border: 0;
    border-radius: 5px;
    transition: all ease .3s;
	&:hover {
		background-color: #35517c;
	}
	&:active {
		background-color: #35517c;
	}
`;

export {
	ButtonWrapper
};