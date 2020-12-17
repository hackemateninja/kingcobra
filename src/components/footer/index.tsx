// Packages
import React, { useState } from 'react';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';

// Components
import Container from '../container';
import Modal from '../modal'

// Styles
import { FooterWrapper, FooterCert, FooterContent, FooterText } from './style';

const Footer: React.FC<IPlainObject> = ( props ) => {
	const date = new Date();
	const [year] = useState<number>(date.getFullYear());
	const [modal, setModal] = useState<boolean>(false);
	const [modalType, setModalType] = useState<string>('');

	const handlerModalOpen = (e: React.MouseEvent<HTMLAnchorElement>) => {
		const target = (e.target as HTMLAnchorElement);
		document.body.style.overflow = 'hidden';

		setModal(true);
		setModalType(target.dataset.type);
	};

	const handlerModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
		document.body.style.overflow = 'unset';
		setModal(false);
		setModalType('');
	};

	return (
		<>
			<FooterWrapper>
				<Container>
					<FooterCert>
						DigiCert Here
					</FooterCert>
					<FooterContent>
						<FooterText>This is a free service with absolutely no obligation.</FooterText>
						<FooterText><a href="#privacy" data-type="privacy" onClick={handlerModalOpen}>Privacy Policy</a> | <a href="#dont-sell" data-type="privacy-dont-sell" onClick={handlerModalOpen}>Do Not Sell My Personal Information</a> | <a href="#terms" data-type="terms" onClick={handlerModalOpen}>Terms of Use</a></FooterText>
						<FooterText>©{year} AutoWeb Inc. All Rights Reserved.</FooterText>
					</FooterContent>
				</Container>
			</FooterWrapper>
			{modal ? <Modal isActive={modal} modalType={modalType} handlerClose={handlerModalClose} /> : null }
		</>
	);
};

export default Footer;