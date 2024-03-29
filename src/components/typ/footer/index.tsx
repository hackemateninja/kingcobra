// Packages
import { useState } from 'react';
import dynamic from 'next/dynamic';

// Components
import Container from '../container';
const Modal = dynamic(() => import('../modal'));

// Styles
import { FooterWrapper, FooterUsage, FooterLink, FooterText } from './style';

const Footer: React.FC = () => {
  const date = new Date();
  const [year] = useState<number>(date.getFullYear());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');

  const handlerModalOpen = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.target as HTMLAnchorElement;
    openModal(target.dataset.type);
  };

  const openModal = (type) => {
    document.body.style.overflow = 'hidden';
    setIsModalOpen(true);
    setModalType(type);
  };

  const handlerModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
    document.body.style.overflow = 'unset';
    setIsModalOpen(false);
    setModalType('');
  };

  return (
    <>
      <FooterWrapper>
        <Container>
          <FooterUsage>
            This is a free service with absolutely no obligation, subject to our{' '}
            <FooterLink href="#terms" data-type="terms" onClick={handlerModalOpen}>
              usage terms and disclaimers
            </FooterLink>
          </FooterUsage>
          <FooterText>
            <FooterLink href="#privacy" data-type="privacy" onClick={handlerModalOpen}>
              Privacy Policy
            </FooterLink>{' '}
            |{' '}
            <FooterLink href="#dont-sell" data-type="privacy-dont-sell" onClick={handlerModalOpen}>
              Do Not Sell My Personal Information
            </FooterLink>{' '}
            |{' '}
            <FooterLink href="#terms" data-type="terms" onClick={handlerModalOpen}>
              Terms of Use
            </FooterLink>
          </FooterText>
          <FooterText>©{year} AutoWeb Inc. All Rights Reserved.</FooterText>
        </Container>
      </FooterWrapper>
      {isModalOpen ? (
        <Modal isActive={isModalOpen} modalType={modalType} handlerClose={handlerModalClose} onOpenModal={openModal} />
      ) : null}
    </>
  );
};

export default Footer;
