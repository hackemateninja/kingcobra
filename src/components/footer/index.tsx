// Packages
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';

// Slices
// import { setModal, setModalType, setYear } from '@/redux/slices/site';

// Components
import Container from '../container';
import Digicert from '../digicert';
const Modal = dynamic(() => import('../modal'));

// Styles
import { FooterWrapper, FooterContent, FooterText } from './style';

const Footer: React.FC<IPlainObject> = (props) => {
  const { year } = props;
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
          <Digicert />
          <FooterContent>
            <FooterText>This is a free service with absolutely no obligation.</FooterText>
            <FooterText>
              <a href="#privacy" data-type="privacy" onClick={handlerModalOpen}>
                Privacy Policy
              </a>{' '}
              |{' '}
              <a href="#dont-sell" data-type="privacy-dont-sell" onClick={handlerModalOpen}>
                Do Not Sell My Personal Information
              </a>{' '}
              |{' '}
              <a href="#terms" data-type="terms" onClick={handlerModalOpen}>
                Terms of Use
              </a>
            </FooterText>
            <FooterText>©{year} AutoWeb Inc. All Rights Reserved.</FooterText>
          </FooterContent>
        </Container>
      </FooterWrapper>
      {isModalOpen ? (
        <Modal isActive={isModalOpen} modalType={modalType} handlerClose={handlerModalClose} onOpenModal={openModal} />
      ) : null}
    </>
  );
};

export default Footer;
