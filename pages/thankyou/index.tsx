// Packages
import { useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import * as QueryString from 'query-string';
import Cookies from 'js-cookie';

// Definitions
import { RootState } from '@/def/TRootReducer';
import { IMake } from '@/def/IMake';
import { IPlainObject } from '@/def/IPlainObject';

// Slices
import { setMakes, setModels } from '@/redux/slices/step-one';
import { setSelectedMakes } from '@/redux/slices/thankyou';

// Styles
import GlobalStyles from '@/theme/global';

// Utilities
import setPrefix from '@/util/prefix';

// Components
import Typ from '@/comp/typ/typ';
import TypHeader from '@/comp/typ/header';
import TypBannerMemorialDay from '@/comp/banners/memorial-day';
import TypTopContent from '@/comp/typ/top-content';
import TypListing from '@/comp/typ/listing';
import TypBottomContent from '@/comp/typ/bottom-content';
import TypFooter from '@/comp/typ/footer';
import SVGs from '@/comp/typ/svgs';
import MetaData from '@/comp/meta-data';

// Services
import { getMakes } from '@/src/services';

const listingInfo = [
  {
    url: '#',
    urlTitle: 'Listing url title',
    title: 'Exclusive Deals For 2020 Ford F-250 in Miami',
    firstText: 'CarsDirect has Exclusive Discounts Available Just For You',
    secondText: 'Click to see your discount on a Ford F-250',
    shortUrl: 'www.carsdirect.com',
    btnText: 'See Price',
  },
];

const Thanks: React.FC<IPlainObject> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const metadata = useSelector((state: RootState) => state.metadata);
  const { prefix, separator } = metadata.thankyou;

  const title = setPrefix(prefix, '', separator);
  const make = useSelector((state: RootState) => state.thankyou.data.make);
  const model = useSelector((state: RootState) => state.thankyou.data.model);
  const zipcode = useSelector((state: RootState) => state.thankyou.data.zipcode);
  const name = useSelector((state: RootState) => state.stepTwo.data.first);
  const lastname = useSelector((state: RootState) => state.stepTwo.data.last);
  const dealers = useSelector((state: RootState) => state.stepTwo.data.selectedDealers);
  const selectedMakes = useSelector((state: RootState) => state.thankyou.data.selectedMakes);
  const image = model.mediumPng ?? model.mediumJpg ?? '/defaultImage.png';

  const utsCookie = Cookies.get('uts-session');
  const utsValues = utsCookie && JSON.parse(decodeURI(utsCookie));
  const utss = utsValues?.utss || router.query.utss;

  const handlerSubmit = (e: React.MouseEvent<HTMLButtonElement>, make: string, model: string) => {
    let url: string;

    const queryparams = QueryString.parse(location.search);
    const { utsu, utss } = queryparams;
    const query = (utsu && utss && `?utsu=${utsu}&utss=${utss}`) || '';
    const { campaign } = router.query;

    if (!zipcode) {
      url = `/${make}/${model}${query}`;
    } else {
      const slQuery = query ? `${query}&sl=true` : `?sl=true`;
      url = `/s2/${make}/${model}/${zipcode}${slQuery}`;
    }
    if (campaign) {
      if (query === '' && !zipcode) {
        url = url + '?campaign=' + campaign;
      } else {
        url = url + '&campaign=' + campaign;
      }
    }

    router.push(url);
  };

  useEffect(() => {
    dispatch(setModels(''));
    dispatch(setMakes(props.makes));
    dispatch(setSelectedMakes([...selectedMakes, make]));
  }, []);

  const values = selectedMakes.map((m) => m.seoName);
  const makesList = props.makes.filter((m) => !values.includes(m.seoName));

  return (
    <>
      <MetaData title={title} />
      <GlobalStyles />
      <Typ>
        <TypBannerMemorialDay />
        {/* <TypHeader /> */}
        <div>
          <TypTopContent name={name} last={lastname} make={make.name} model={model.name} dealers={dealers} />
          <TypListing
            image={image}
            alt={`${make.name} ${model.name}`}
            listingInfo={listingInfo}
            make={make.name}
            model={model.name}
            zipcode={zipcode}
            utss={utss}
          />
          <TypBottomContent makes={makesList} onSubmit={handlerSubmit} />
          <TypFooter />
        </div>
      </Typ>
      <SVGs />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const makes: IMake[] = await getMakes();
  return { props: { makes }, revalidate: 86400 };
};

export default Thanks;
