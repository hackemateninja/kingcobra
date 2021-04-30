// Packages
import React from 'react';

// Definitions
import { IPlainObject } from '../../definitions/IPlainObject';

// Components
import Header from '../../components/header';
import SVGs from '../../components/svgs';
import Footer from '../../components/footer';
import Container from '../../components/container';

const DefaultLayout: React.FC<IPlainObject> = (props) => {
  return (
    <>
      <Header month={props.month} />
      <Container>{props.children}</Container>
      <Footer year={props.year} />
      <SVGs />
    </>
  );
};

export default DefaultLayout;
