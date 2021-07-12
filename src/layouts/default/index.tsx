// Packages
import React from 'react';

// Definitions
import { IPlainObject } from '../../definitions/IPlainObject';

// Components
import Header from '../../components/header';
import SVGs from '../../components/svgs';
import Footer from '../../components/footer';
import Container from '../../components/container';
// import { RootState } from '@/def/TRootReducer';
// import { useSelector } from 'react-redux';
// import { HeaderWrapper } from '@/comp/header/style';
// import Skeleton from 'react-loading-skeleton';

//Headers
// import HeaderPresidentDay from '@/comp/banners/president-day';
// import HeaderMemorialDay from '@/comp/banners/memorial-day';

const DefaultLayout: React.FC<IPlainObject> = (props) => {
  // const dataLoading = useSelector((state: RootState) => state.site.ui.dataLoading);
  // const choseHeader = ({ banner, month }) => {
  //   if (dataLoading) {
  //     return (
  //       <HeaderWrapper>
  //         <Skeleton />
  //       </HeaderWrapper>
  //     );
  //   } else {
  //     switch (banner) {
  //       case 'President Day':
  //         return <HeaderPresidentDay month={month} />;
  //       case 'Memorial Day':
  //         return <HeaderMemorialDay />;
  //       case '4th July':
  //         return <HeaderFourthJuly />;
  //       default:
  //         return <Header month={month} />;
  //     }
  //   }
  // };

  return (
    <>
      {/* {choseHeader(props as never)} */}
      <Header />
      <Container>{props.children}</Container>
      <Footer year={props.year} />
      <SVGs />
    </>
  );
};

export default DefaultLayout;
