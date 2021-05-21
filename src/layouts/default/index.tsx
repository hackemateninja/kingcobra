// Packages
import React from 'react';

// Definitions
import { IPlainObject } from '../../definitions/IPlainObject';

// Components
import Header from '../../components/header';
// eslint-disable-next-line import/no-unresolved
import HeaderPresidentDay from '@/comp/banners/president-day';
import SVGs from '../../components/svgs';
import Footer from '../../components/footer';
import Container from '../../components/container';

const DefaultLayout: React.FC<IPlainObject> = (props) => {
  return (
    <>
      {choseHeader(props as never)}
      <Container>{props.children}</Container>
      <Footer year={props.year} />
      <SVGs />
    </>
  );
};

const choseHeader = ({ banner, month }) => {
  switch (banner) {
    case 'President Day':
      return <HeaderPresidentDay month={month} />;
    default:
      return <Header month={month} />;
  }
};

export default DefaultLayout;
