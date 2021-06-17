// Packages
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useUserAgent } from 'next-useragent';
import * as cookie from 'cookie';
import { SeverityLevel } from '@microsoft/applicationinsights-web';
import * as QueryString from 'query-string';
import Skeleton from 'react-loading-skeleton';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import { RootState } from '@/def/TRootReducer';
import { IModel } from '@/def/IModel';
import { IMldDealersResponse } from '@/def/IMldResponse';
import { IMake } from '@/def/IMake';

// Layout
import DefaultLayout from '@/layout/default';

// Slices
import { saveModels, setMakes, setSelectedMake, setSelectedModel, setZipCode } from '@/redux/slices/step-one';
import { saveDeviceType, saveDealers, setButton2Text, setButton3Text } from '@/redux/slices/step-two';
import { setSelectedMakeTYP, setSelectedModelTYP, setZipCodeTYP } from '@/redux/slices/thankyou';
import { setDataLoading } from '@/redux/slices/site';

// Components
import StepTwo from '@/comp/steps/step-two';
import Title from '@/comp/title';
import SubTitle from '@/comp/subtitle';
import Display from '@/comp/container/display';
import MetaData from '@/comp/meta-data';
import Redirect from '@/comp/redirect';
import DynamicAdWidget from '@/comp/dynamic-ad-widget';

// Utilities
import setSuffix from '@/util/suffix';
import combineAnS from '@/util/combine-ans';
import setPrefix from '@/util/prefix';
import { config } from '@/util/config';
import { appInsights } from '@/util/app-insights';
import getYear from '@/util/get-year';
import getMonth from '@/util/get-month';

// Styles
import GlobalStyles from '@/theme/global';

// Services
import { getCampaignData, getMakes, getModelsByMake, getDealers } from '@/src/services';

const zipRegex = /^\d{5}$|^\d{5}$/;

const PageStepTwo: React.FC<IPlainObject> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [enteredHeadline1, setEnteredHeadline1] = useState(null);
  const [enteredHeadline2, setEnteredHeadline2] = useState(null);
  const [enteredCampaignImage, setCampaignImage] = useState(null);
  const [enteredBanner, setBanner] = useState(null);

  if (!props.make || !props.model || !props.zip || !zipRegex.test(props.zip)) {
    return <Redirect parameters={router.query.utm_campaign ? `?utm_campaign=${router.query.utm_campaign}` : ''} />;
  }

  const metadata = useSelector((state: RootState) => state.metadata);
  const zipcode = useSelector((state: RootState) => state.stepOne.data.zipcode);
  const boxActive = useSelector((state: RootState) => state.stepTwo.ui.boxActive);
  const dataLoading = useSelector((state: RootState) => state.site.ui.dataLoading);

  const { makes, models, make, model, ua, dealers, campaign } = props;
  const { prefix, separator, description, keywordsPnS } = metadata.model;

  const name = `${make.name} ${model.name}`;
  const title = `${setSuffix(prefix, name, ` ${separator} `)} ${separator} ${metadata.name}`;
  const noCoverageTitle = `No Coverage ${separator} ${metadata.name}`;
  const desc = combineAnS(description, name);
  const prekeys = setPrefix(keywordsPnS.prefix, name, ', ');
  const sufkeys = setSuffix(keywordsPnS.suffix, name, ', ');
  const keys = `${prekeys}, ${sufkeys}`;

  if (dealers && !dealers.coverage) {
    return (
      <DynamicAdWidget
        title={noCoverageTitle}
        make={props.make.name}
        model={props.model.name}
        zip={props.zip}
        utss={props.utss}
        category="1"
        implement="1178"
      />
    );
  }

  useEffect(() => {
    if (!campaign) {
      dispatch(setDataLoading(false));
    }
    let device: string;
    if (ua.isMobile) {
      device = 'Mobile';
    } else if (ua.isTablet) {
      device = 'Tablet';
    } else {
      device = 'Desktop';
    }
    dispatch(saveDeviceType(device));
    dispatch(setMakes(makes));
    dispatch(saveModels(models));
    dispatch(setSelectedMake(make.seoName));
    dispatch(setSelectedModel(model.seoName));
    if (dealers) {
      dispatch(saveDealers(dealers));
      dispatch(setZipCode(props.zip));
    }
  }, []);

  useEffect(() => {
    if (!dealers || !campaign) return;
    const step = dealers.dealers.length > 1 ? 'step_2' : 'step_3';
    setGraphData(step);
  }, []);

  useEffect(() => {
    if (boxActive !== 'form' || !dealers || !router.isReady) return;
    if (!campaign) dispatch(setDataLoading(false));
    setGraphData('step_3');
  }, [boxActive]);

  const setGraphData = async (step: string) => {
    const result = await getCampaignData(campaign, step, make?.name, model?.name);
    if (!result || !result[0]) {
      dispatch(setDataLoading(false));
      return;
    }
    const [data] = result;
    setBanner(data.banner.banner);
    setEnteredHeadline1(data.h1Headline);
    setEnteredHeadline2(data.h2Headline);
    setCampaignImage(data.heroImage);
    if (step === 'step_2') {
      dispatch(setButton2Text(data.buttonCta));
    }
    if (step === 'step_3') {
      dispatch(setButton3Text(data.buttonCta));
    }
    dispatch(setDataLoading(false));
  };

  const handlerSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setSelectedMakeTYP(props.make));
    dispatch(setSelectedModelTYP(props.model));
    dispatch(setZipCodeTYP(props.zip));

    const queryparams = QueryString.parse(location.search);
    const { utsu, utss } = queryparams;
    const query = (utsu && utss && `?utsu=${utsu}&utss=${utss}`) || '';
    let campaignQuery = '';
    if (campaign) {
      if (query === '') {
        campaignQuery = '?utm_campaign=' + campaign;
      } else {
        campaignQuery = '&utm_campaign=' + campaign;
      }
    }

    router.push(`/thankyou${query}${campaignQuery}`);
  };

  const city = zipcode.zip && `${zipcode.city}, ${zipcode.state} ${zipcode.zip}`;

  return (
    <>
      <MetaData title={title} description={desc} keywords={keys} />
      <GlobalStyles />
      <DefaultLayout year={props.year} month={props.month} banner={enteredBanner}>
        <Display hide="mobile">
          <Title>
            {dataLoading ? (
              <Skeleton />
            ) : enteredHeadline1 ? (
              <div dangerouslySetInnerHTML={{ __html: enteredHeadline1 }}></div>
            ) : (
              <>
                Yes! We Located {make.name} {model.name} Internet Deals
              </>
            )}
          </Title>
        </Display>
        <SubTitle>
          {dataLoading ? (
            <Skeleton />
          ) : enteredHeadline1 ? (
            <div dangerouslySetInnerHTML={{ __html: enteredHeadline2 }}></div>
          ) : (
            <>Choose your preferred dealers and fill out the form to find offers!</>
          )}
        </SubTitle>
        <StepTwo
          campaignImage={enteredCampaignImage}
          model={model}
          city={city}
          zipcode={props.zip}
          onSubmit={handlerSubmit}
        />
      </DefaultLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ua = useUserAgent(context.req.headers['user-agent']);

  let utss = '';
  if (context.req.headers.cookie) {
    const cookies = cookie.parse(context.req.headers.cookie);
    const utsCookie = cookies['uts-session'];
    const utsValues = utsCookie && JSON.parse(decodeURI(utsCookie));

    utss = utsValues?.utss;
  } else {
    utss = context.query.utss as string;
  }

  const cxtMake = context.query.make;
  const cxtModel = context.query.model;
  const cxtZip = context.query.zipcode;
  const secondary = context.query.sl;
  const campaign = context.query.utm_campaign;

  const makes: IMake[] = await getMakes();
  const make = makes.find((item) => item.seoName === cxtMake);
  const models: IModel[] = await getModelsByMake(cxtMake);
  const model = models.find((item) => item.seoName === cxtModel);

  const sourceId = secondary ? config.altSourceId : config.sourceId;
  let dealers = [];

  try {
    dealers = await getDealers(
      sourceId,
      encodeURIComponent(make?.name),
      encodeURIComponent(model?.name),
      model?.year,
      cxtZip,
      utss
    );
  } catch (err) {
    appInsights.trackTrace({
      message: `${err} - Something went wrong getting dealers: ${cxtMake}-${cxtModel}-${cxtZip}`,
      properties: {
        make: cxtMake,
        model: cxtModel,
        zip: cxtZip,
      },
      severityLevel: SeverityLevel.Error,
    });

    // return { coverage: false, dealers: [] };
  }

  const url = `${config.apiFunctionUrl}/api/dealers?sourceId=${sourceId}
    &make=${encodeURIComponent(make?.name)}&model=${encodeURIComponent(model?.name)}
    &year=${model?.year}&zip=${cxtZip}&sessionId=${utss}`;

  const year = getYear();
  const month = getMonth();

  return {
    props: {
      makes,
      models,
      make: make || null,
      model: model || null,
      zip: cxtZip,
      ua,
      useragent: ua.source,
      dealers,
      year,
      month,
      utss: utss || '',
      campaign: campaign || null,
    },
  };
};

export default PageStepTwo;
