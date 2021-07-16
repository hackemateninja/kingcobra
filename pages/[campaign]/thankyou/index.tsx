// Packages
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import Cookies from 'js-cookie';

// Definitions
import { IMake } from '@/def/IMake';
import { IModel } from '@/def/IModel';
import { IPlainObject } from '@/def/IPlainObject';

// Data
import metadata from '@/data/metadata';

// Styles
import GlobalStyles from '@/theme/global';

// Context
import { useAppContext } from '@/ctx/app-context';

// Utilities
import setPrefix from '@/util/prefix';
import { config } from '@/util/config';
import useBroadcast from '@/src/hooks/useBroadcast';

// Components
import Typ from '@/comp/typ/typ';
import TypHeader from '@/comp/typ/header';
import TypTopContent from '@/comp/typ/top-content';
import TypListing from '@/comp/typ/listing';
import TypBottomContent from '@/comp/typ/bottom-content';
import TypFooter from '@/comp/typ/footer';
import SVGs from '@/comp/typ/svgs';
import MetaData from '@/comp/meta-data';

// Services
import { getCampaigns, getMakes } from '@/src/services';

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
  const [fasMessage, emitFasMessage] = useBroadcast('fas');

  const {
    state: { selectedMake, selectedModel, zipCodeInfo, customer, selectedDealers, sourceIds },
  } = useAppContext();

  const { prefix, separator } = metadata.thankyou;
  const title = setPrefix(prefix, '', separator);

  const image = selectedModel.mediumPng ?? selectedModel.mediumJpg ?? '/defaultImage.png';

  const utsCookie = Cookies.get('uts-session');
  const utsValues = utsCookie && JSON.parse(decodeURI(utsCookie));
  const utss = utsValues?.utss || router.query.utss;

  const handlerSubmit = (e: React.MouseEvent<HTMLButtonElement>, make: IMake, model: IModel) => {
    let url: string;

    const { utsu } = router.query;
    const sourceId = sourceIds.sourceId !== config.sourceId ? sourceIds.sourceId : null;
    const altSourceId = sourceIds.altSourceId !== config.altSourceId ? sourceIds.altSourceId : null;

    const params = new URLSearchParams();

    if (utsu) params.append('utsu', utsu as string);
    if (utss) params.append('utss', utss as string);

    if (!zipCodeInfo.zip) {
      let paramsString = params.toString();
      paramsString = paramsString.length ? `?${paramsString}` : '';

      url = `${make.seoName}/${model.seoName}${paramsString}`;
    } else {
      params.append('sl', 'true');
      if (sourceId) params.append('primary_sid', sourceId as string);
      if (altSourceId) params.append('thankyou_sid', altSourceId as string);

      let paramsString = params.toString();
      paramsString = paramsString.length ? `?${paramsString}` : '';

      url = `s2/${make.seoName}/${model.seoName}/${zipCodeInfo.zip}${paramsString}`;
    }

    emitFasMessage({ make, model, zipcode: zipCodeInfo.zip, campaign: props.campaign });
    router.push(`/${props.campaign}/${url}`);
  };

  const makesList = props.makes.filter((m) => m.seoName !== selectedMake.seoName);

  return (
    <>
      <MetaData title={title} />
      <GlobalStyles />
      <Typ>
        <TypHeader />
        <div>
          <TypTopContent
            name={customer.firstName}
            last={customer.lastName}
            make={selectedMake.name}
            model={selectedModel.name}
            dealers={selectedDealers}
          />
          <TypListing
            image={image}
            alt={`${selectedMake.name} ${selectedModel.name}`}
            listingInfo={listingInfo}
            make={selectedMake.name}
            model={selectedModel.name}
            zipcode={zipCodeInfo.zip}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const campaigns = await getCampaigns();

  const paths = campaigns.map((campaign) => ({
    params: { campaign },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const makes: IMake[] = await getMakes();
  const { campaign } = params;

  return { props: { makes, campaign }, revalidate: 86400 };
};

export default Thanks;
