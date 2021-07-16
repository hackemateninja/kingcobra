// Packages
import { useEffect, useState } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useUserAgent } from 'next-useragent';
import * as cookie from 'cookie';
// import { SeverityLevel } from '@microsoft/applicationinsights-web';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import { IModel } from '@/def/IModel';
import { IMldDealersResponse } from '@/def/IMldResponse';
import { IMake } from '@/def/IMake';
import { IZipCode } from '@/def/IZipCode';
import { IDealer } from '@/def/IDealers';
import { IPostLeadParams } from '@/def/IPostLeadParams';

// Layout
import DefaultLayout from '@/layout/default';

// Data
import metadata from '@/data/metadata';

// Components
import StepTwo from '@/comp/steps/step-two';
import Title from '@/comp/title';
import SubTitle from '@/comp/subtitle';
import Display from '@/comp/container/display';
import MetaData from '@/comp/meta-data';
import Redirect from '@/comp/redirect';
import DynamicAdWidget from '@/comp/dynamic-ad-widget';

// Context
import { useAppContext } from '@/ctx/app-context';

// Utilities
import setSuffix from '@/util/suffix';
import combineAnS from '@/util/combine-ans';
import setPrefix from '@/util/prefix';
import { config } from '@/util/config';
import getYear from '@/util/get-year';
import getMonth from '@/util/get-month';
import randomizer from '@/util/random-quotes';
import parseGraphData from '@/util/parse-graph-data';
// import { appInsights } from '@/util/app-insights';

// Styles
import GlobalStyles from '@/theme/global';

// Services
import {
  getCampaignData,
  getMakes,
  getModelsByMake,
  getDealers,
  getZipCodeInfo as getZipCodeInfoService,
  postLead,
} from '@/src/services';

const zipRegex = /^\d{5}$|^\d{5}$/;

const StepTwoPage: React.FC<IPlainObject> = (props) => {
  const {
    quotes,
    make,
    model,
    zip,
    ua,
    dealersInfo,
    campaign,
    graphData,
    step: initialStep,
    sourceId,
    altSourceId,
    utss,
  } = props;
  const router = useRouter();
  const {
    setSelectedMake,
    setSelectedModel,
    setZipCodeInfo: setZipCodeInfoCtx,
    setCustomer,
    setSelectedDealers,
    setSourceIds,
  } = useAppContext();

  // Default page content
  const defaultTitle = (
    <>
      Yes! We Located {make.name} {model.name} Internet Deals
    </>
  );
  const defaultSubtitle = <>Choose your preferred dealers and fill out the form to find offers!</>;

  const [zipCodeInfo, setZipCodeInfo] = useState<IZipCode>({});
  const [dealers, setDealers] = useState<IDealer[]>([]);
  const [transactionId, setTransactionId] = useState();

  const [device, setDevice] = useState<'Unknown' | 'Mobile' | 'Tablet' | 'Desktop'>('Unknown');
  const [step, setStep] = useState(initialStep);

  const { prefix, separator, description, keywordsPnS } = metadata.model;

  const name = `${make.name} ${model.name}`;
  const title = `${setSuffix(prefix, name, ` ${separator} `)} ${separator} ${metadata.name}`;
  const noCoverageTitle = `No Coverage ${separator} ${metadata.name}`;
  const desc = combineAnS(description, name);
  const prekeys = setPrefix(keywordsPnS.prefix, name, ', ');
  const sufkeys = setSuffix(keywordsPnS.suffix, name, ', ');
  const keys = `${prekeys}, ${sufkeys}`;

  const getZipCodeInfo = async (zipCode: string) => {
    let zipCodeData = await getZipCodeInfoService(zipCode);

    if (zipCodeData.length !== 0 && zipCodeData[0]['status'] === undefined) {
      zipCodeData = zipCodeData[0].zipcodes[0];
      setZipCodeInfo({
        city: zipCodeData.default_city,
        state: zipCodeData.state_abbreviation,
        zip: zipCodeData.zipcode,
      });
    } else {
      setZipCodeInfo({});
    }
  };

  const processDealers = (dealersInfo) => {
    const dealersProcessed = dealersInfo.dealers.map((dealer) => ({
      ...dealer,
      id: dealer.dealerID,
      programId: dealer.programID,
      isChecked: dealer.programID === 1 || dealer.programID === 127,
    }));

    setDealers(dealersProcessed);
    setTransactionId(dealersInfo.transactionID);
  };

  useEffect(() => {
    if (ua.isMobile) {
      setDevice('Mobile');
    } else if (ua.isTablet) {
      setDevice('Tablet');
    } else {
      setDevice('Desktop');
    }

    if (dealersInfo) {
      processDealers(dealersInfo);
      getZipCodeInfo(props.zip);
    }
  }, []);

  const onStepChange = () => {
    setStep('step_3');
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>, customer, selectedDealers) => {
    const lead: IPostLeadParams = {
      customer,
      vehicle: {
        make: make.name,
        model: model.name,
        year: model.year,
      },
      sourceId,
      selectedDealers: selectedDealers.map((dealer) => ({
        programId: dealer.programId,
        dealerId: dealer.id,
        dealerCode: dealer.dealerCode,
        distance: dealer.distance,
      })),
      device,
      transactionId,
      sessionId: utss,
    };

    await postLead(lead);

    setSelectedMake(make);
    setSelectedModel(model);
    setZipCodeInfoCtx(zipCodeInfo);
    setCustomer(customer);
    setSelectedDealers(selectedDealers);
    setSourceIds({ sourceId, altSourceId });

    const { utsu } = router.query;
    const params = new URLSearchParams();

    if (utsu) params.append('utsu', utsu as string);
    if (utss) params.append('utss', utss as string);

    let paramsString = params.toString();
    paramsString = paramsString.length ? `?${paramsString}` : '';

    router.push(`/${campaign}/thankyou${paramsString}`);
  };

  if (!make || !model || !zip || !zipRegex.test(zip)) {
    return <Redirect parameters={campaign || ''} />;
  }

  if (dealersInfo && !dealersInfo.coverage) {
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

  return (
    <>
      <MetaData title={title} description={desc} keywords={keys} />
      <GlobalStyles />
      <DefaultLayout year={props.year} month={props.month}>
        <Display hide="mobile">
          <Title>
            {graphData[step]?.h1Headline
              ? parseGraphData(graphData[step].h1Headline, make.name, model.name)
              : defaultTitle}
          </Title>
        </Display>
        <SubTitle>
          {graphData[step]?.h2Headline
            ? parseGraphData(graphData[step].h2Headline, make.name, model.name)
            : defaultSubtitle}
        </SubTitle>
        <StepTwo
          campaignImage={graphData[step].heroImage}
          model={model}
          quotes={quotes}
          zipCodeInfo={zipCodeInfo}
          onSubmit={handleSubmit}
          dealers={dealers}
          buttonText={graphData[step]?.buttonCta}
          onStepChange={onStepChange}
        />
      </DefaultLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userAgent = useUserAgent(context.req.headers['user-agent']);

  let utss = '';
  if (context.req.headers.cookie) {
    const cookies = cookie.parse(context.req.headers.cookie);
    const utsCookie = cookies['uts-session'];
    const utsValues = utsCookie && JSON.parse(decodeURI(utsCookie));

    utss = utsValues?.utss;
  } else {
    utss = context.query.utss as string;
  }

  const { sl: secondary, primary_sid, thankyou_sid } = context.query;
  const { make: makeName, model: modelName, zipcode: zipCode, campaign } = context.params;

  const makes: IMake[] = await getMakes();
  const make = makes.find((item) => item.seoName === makeName);
  const models: IModel[] = await getModelsByMake(make.seoName);
  const model = models.find((item) => item.seoName === modelName);

  const primaryId = primary_sid ? primary_sid : config.sourceId;
  const secondaryId = thankyou_sid ? thankyou_sid : config.altSourceId;
  const sourceId = secondary ? secondaryId : primaryId;

  let dealersInfo: IMldDealersResponse = {};

  try {
    dealersInfo = await getDealers(
      sourceId as string,
      encodeURIComponent(make?.name),
      encodeURIComponent(model?.name),
      model?.year,
      zipCode as string,
      utss
    );
  } catch (err) {
    // appInsights.trackTrace({
    //   message: `${err} - Something went wrong getting dealers: ${cxtMake}-${cxtModel}-${cxtZip}`,
    //   properties: {
    //     make: cxtMake,
    //     model: cxtModel,
    //     zip: cxtZip,
    //   },
    //   severityLevel: SeverityLevel.Error,
    // });
    console.error(err);

    // return { coverage: false, dealers: [] };
  }

  const year = getYear();
  const month = getMonth();
  const quotes = randomizer();

  const graphData: any = {};
  const step = dealersInfo.dealers.length > 1 ? 'step_2' : 'step_3';

  if (step === 'step_2') {
    graphData.step_2 = await getCampaignData(campaign, 'step_2');
    graphData.step_3 = await getCampaignData(campaign, 'step_3');
  } else {
    graphData.step_3 = await getCampaignData(campaign, 'step_3');
  }

  return {
    props: {
      year,
      month,
      quotes,
      makes,
      models,
      make: make || null,
      model: model || null,
      zip: zipCode,
      ua: userAgent,
      useragent: userAgent.source,
      dealersInfo,
      sourceId: sourceId || '',
      altSourceId: secondaryId || '',
      utss: utss || '',
      campaign: campaign || null,
      graphData,
      step,
    },
  };
};

export default StepTwoPage;
