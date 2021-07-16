// Definitions
import { IPlainObject } from '../../definitions/IPlainObject';

// Components
import Header from '@/comp/header';
import SVGs from '@/comp/svgs';
import Footer from '@/comp/footer';
import Container from '@/comp/container';

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
