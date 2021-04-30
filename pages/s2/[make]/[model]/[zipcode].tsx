// Packages
import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useUserAgent } from 'next-useragent';
import * as cookie from 'cookie';
import { SeverityLevel } from '@microsoft/applicationinsights-web';
import * as QueryString from 'query-string';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import { RootState } from '@/def/TRootReducer';
import { IModel } from '@/def/IModel';
import { IMldDealersResponse } from '@/def/IMldResponse';

// Layout
import DefaultLayout from '@/layout/default';

// Slices
import { saveModels, setMakes, setSelectedMake, setSelectedModel, setZipCode } from '@/redux/slices/step-one';
import { saveDeviceType, saveDealers } from '@/redux/slices/step-two';
import { setSelectedMakeTYP, setSelectedModelTYP, setZipCodeTYP } from '@/redux/slices/thankyou';

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
import CarcomTheme from '@/theme/carcom';

const zipRegex = /^\d{5}$|^\d{5}$/;

const PageStepTwo: React.FC<IPlainObject> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  if (!props.make || !props.model || !props.zip || !zipRegex.test(props.zip)) {
    return <Redirect />;
  }

  const metadata = useSelector((state: RootState) => state.metadata);
  const zipcode = useSelector((state: RootState) => state.stepOne.data.zipcode);

  const { makes, models, make, model, ua, dealers } = props;
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
    let device: string;
    if (ua.isMobile) {
      device = 'Mobile';
    } else if (ua.isTablet) {
      device = 'Tablet';
    } else {
      device = 'Desktop';
    }

    dispatch(saveDeviceType(device));
  }, []);

  const handlerSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setSelectedMakeTYP(props.make));
    dispatch(setSelectedModelTYP(props.model));
    dispatch(setZipCodeTYP(props.zip));

    const queryparams = QueryString.parse(location.search);
    const { utsu, utss } = queryparams;
    const query = (utsu && utss && `?utsu=${utsu}&utss=${utss}`) || '';

    router.push(`/thankyou${query}`);
  };

  useEffect(() => {
    dispatch(setMakes(makes));
    dispatch(saveModels(models));
    dispatch(setSelectedMake(make.seoName));
    dispatch(setSelectedModel(model.seoName));
    if (dealers) {
      dispatch(saveDealers(dealers));
      dispatch(setZipCode(props.zip));
    }
  }, []);

  const city = zipcode.zip && `${zipcode.city}, ${zipcode.state} ${zipcode.zip}`;

  return (
    <ThemeProvider theme={CarcomTheme}>
      <MetaData title={title} description={desc} keywords={keys} />
      <GlobalStyles />
      <DefaultLayout year={props.year} month={props.month}>
        <Display hide="mobile">
          <Title>
            Yes! We Located {make.name} {model.name} Internet Deals
          </Title>
        </Display>
        <SubTitle>Choose your preferred dealers and fill out the form to find offers!</SubTitle>
        <StepTwo model={model} city={city} zipcode={props.zip} onSubmit={handlerSubmit} />
      </DefaultLayout>
    </ThemeProvider>
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

  const makes = await fetch(`${config.apiBaseUrl}/api/makes`).then((r) => r.json());
  const make = makes.find((item) => item.seoName === cxtMake);

  const models = await fetch(`${config.apiBaseUrl}/api/models/${cxtMake}`).then<IModel[]>((r) => r.json());
  const model = models.find((item) => item.seoName === cxtModel);

  const sourceId = secondary ? config.altSourceId : config.sourceId;
  const url = `${config.apiBaseUrl}/api/dealers?sourceId=${sourceId}
    &make=${encodeURIComponent(make?.name)}&model=${encodeURIComponent(model?.name)}
    &year=${model?.year}&zip=${cxtZip}&sessionId=${utss}`;

  const dealers = await fetch(url)
    .then<IMldDealersResponse>((r) => r.json())
    .catch((err) => {
      appInsights.trackTrace({
        message: `${err} - Something went wrong getting dealers: ${cxtMake}-${cxtModel}-${cxtZip}`,
        properties: {
          make: cxtMake,
          model: cxtModel,
          zip: cxtZip,
        },
        severityLevel: SeverityLevel.Error,
      });

      return { coverage: false, dealers: [] };
    });

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
      utss,
    },
  };
};

export default PageStepTwo;
