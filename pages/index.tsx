// Packages
import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import * as QueryString from 'query-string';
import Skeleton from 'react-loading-skeleton';
import Parse from 'html-react-parser';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import { RootState } from '@/src/definitions/TRootReducer';
import { IPreload } from '@/def/IMetaData';
import { IMake } from '@/def/IMake';

// Layout
import DefaultLayout from '@/layout/default';

// Styles
import GlobalStyles from '@/theme/global';

// Slices
import { setButtonText, setMakes } from '@/redux/slices/step-one';
import { setDataLoading } from '@/redux/slices/site';

// Components
import Title from '@/comp/title';
import SubTitle from '@/comp/subtitle';
import StepOne from '@/comp/steps/step-one';
import MetaData from '@/comp/meta-data';

// services
import { getCampaignData, getMakes } from '@/src/services';

// Utilities
import { config } from '@/util/config';
import getMonth from '@/util/get-month';
import getYear from '@/util/get-year';
import randomizer from '@/util/random-quotes';

const Home: React.FC<IPlainObject> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [enteredHeadline1, setEnteredHeadline1] = useState(null);
  const [enteredHeadline2, setEnteredHeadline2] = useState(null);
  const [enteredCampaignImage, setCampaignImage] = useState(null);
  const [enteredBanner, setBanner] = useState(null);
  // const [dataLoading, setDataLoading] = useState(true);

  const metadata = useSelector((state: RootState) => state.metadata);
  const stepOne = useSelector((state: RootState) => state.stepOne.data);
  const dataLoading = useSelector((state: RootState) => state.site.ui.dataLoading);

  const { month } = props;
  const { prefix, separator, description, keywords } = metadata.home;
  const title = `${prefix.join(` ${separator} `)} ${separator} ${metadata.name}`;
  const { utm_campaign, primary_sid, thankyou_sid } = router.query;

  const handlerSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { selectedMake, selectedModel, zipcode } = stepOne;
    const { zip } = zipcode;

    const queryparams = QueryString.parse(location.search);
    const { utsu, utss } = queryparams;
    const query = (utsu && utss && `?utsu=${utsu}&utss=${utss}`) || '';
    let campaignQuery = '';
    if (utm_campaign) {
      if (query === '') {
        campaignQuery = '?utm_campaign=' + utm_campaign;
      } else {
        campaignQuery = '&utm_campaign=' + utm_campaign;
      }
    }

    window.open(
      `/s2/${selectedMake.seoName}/${selectedModel.seoName}/${zip}${query}${campaignQuery}`,
      '',
      `width=${screen.width},height=${screen.height}`
    );
    router.push(`/fas/${selectedMake.seoName}/${selectedModel.seoName}/${zip}${query}${campaignQuery}`);
  };

  const setGraphData = async () => {
    const result = await getCampaignData(utm_campaign, 'unbranded_page');
    if (!result || !result[0]) {
      dispatch(setDataLoading(false));
      return;
    }
    const [data] = result;
    setEnteredHeadline1(data.h1Headline);
    setEnteredHeadline2(data.h2Headline);
    setCampaignImage(data.heroImage);
    setBanner(data.banner.banner);
    dispatch(setButtonText(data.buttonCta));
    dispatch(setDataLoading(false));
  };

  useEffect(() => {
    dispatch(setMakes(props.makes));
  }, []);

  useEffect(() => {
    if (utm_campaign || primary_sid || thankyou_sid) {
      setGraphData();
      return;
    }
    if (router.isReady) dispatch(setDataLoading(false));
  }, [utm_campaign, primary_sid, thankyou_sid, router.isReady]);

  const preload: IPreload[] = [{ type: 'image', elem: '/hero-image.jpg' }];
  return (
    <>
      <MetaData title={title} description={description.join('')} keywords={keywords} preload={preload} />
      <GlobalStyles />
      <DefaultLayout year={props.year} month={month} banner={enteredBanner}>
        <Title>
          {dataLoading ? (
            <Skeleton />
          ) : enteredHeadline1 ? (
            <>{Parse(enteredHeadline1)}</>
          ) : (
            <> Huge {month} Closeout on All New Vehicles </>
          )}
        </Title>
        <SubTitle>
          {dataLoading ? (
            <Skeleton />
          ) : enteredHeadline2 ? (
            <>{Parse(enteredHeadline2)}</>
          ) : (
            <>
              Compare Prices from Multiple Dealers and <strong>Get the Lowest Price</strong>
            </>
          )}
        </SubTitle>
        <StepOne
          campaignImage={enteredCampaignImage}
          onSubmit={handlerSubmit}
          makes={props.makes}
          image="/hero-image.jpg"
          quotes={props.quotes}
        />
      </DefaultLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const makes: IMake[] = await getMakes();

  const month = getMonth();
  const year = getYear();
  const quotes = randomizer();

  return { props: { makes, month, year, quotes }, revalidate: 86400 };
};

export default Home;
