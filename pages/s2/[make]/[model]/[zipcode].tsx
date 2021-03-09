// Packages
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import absoluteUrl from "next-absolute-url";
import useScript from "@/src/hooks/useScript";
import { useUserAgent } from "next-useragent";
// import Cookies from "js-cookie";
import * as cookie from "cookie";
import { SeverityLevel } from "@microsoft/applicationinsights-web";

// Data
import { makes } from "@/data/makes";

// Definitions
import { IPlainObject } from "@/def/IPlainObject";
import { RootState } from "@/def/TRootReducer";
import { IModel } from "@/def/IModel";
import { IMldDealersResponse } from "@/def/IMldResponse";

// Layout
import DefaultLayout from "@/layout/default";

// Slices
import { setMonth } from "@/redux/slices/site";
import { saveModels, setMakes, setSelectedMake, setSelectedModel, setZipCode } from "@/redux/slices/step-one";
import { saveDeviceType, saveDealers } from "@/redux/slices/step-two";
import { setSelectedMakeTYP, setSelectedModelTYP, setZipCodeTYP } from "@/redux/slices/thankyou";

// Components
import StepTwo from "@/comp/steps/step-two";
import Title from "@/comp/title";
import SubTitle from "@/comp/subtitle";
import Display from "@/comp/container/display";
import MetaData from "@/comp/meta-data";
import Redirect from "@/comp/redirect";

// Utilities
import setSuffix from "@/util/suffix";
import combineAnS from "@/util/combine-ans";
import setPrefix from "@/util/prefix";
import { config } from "@/util/config";
import { appInsights } from "@/util/app-insights";

// Styles
import GlobalStyles from "@/theme/global";
import CarcomTheme from "@/theme/carcom";

const zipRegex = /^\d{5}$|^\d{5}$/;

const PageStepTwo: React.FC<IPlainObject> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  if (!props.make || !props.model || !props.zip || !zipRegex.test(props.zip)) {
    return <Redirect />;
  }

  const metadata = useSelector((state: RootState) => state.metadata);
  const month = useSelector((state: RootState) => state.site.month);
  const zipcode = useSelector((state: RootState) => state.stepOne.data.zipcode);

  const { models, make, model, ua, dealers } = props;
  const { prefix, separator, description, keywordsPnS } = metadata.model;

  const name = `${make.name} ${model.name}`;
  const title = `${setSuffix(prefix, name, ` ${separator} `)} ${separator} ${metadata.name}`;
  const noCoverageTitle = `No Coverage ${separator} ${metadata.name}`;
  const desc = combineAnS(description, name);
  const prekeys = setPrefix(keywordsPnS.prefix, name, ", ");
  const sufkeys = setSuffix(keywordsPnS.suffix, name, ", ");
  const keys = `${prekeys}, ${sufkeys}`;

  if (dealers && !dealers.coverage) {
    return (
      <>
        <MetaData title={noCoverageTitle} />
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html:
              `<div class="awlistings" aw-implement="1178" aw-category="1" aw-make="` +
              props.make.name +
              `" aw-model="` +
              props.model.name +
              `" aw-zipcode="` +
              props.zip +
              `"></div>`,
          }}
        ></div>
        {useScript("//cdn.awadserver.com/widget/js/awloader.min.js", "3410")}
      </>
    );
  }

  useEffect(() => {
    let device: string;
    if (ua.isMobile) {
      device = "Mobile";
    } else if (ua.isTablet) {
      device = "Tablet";
    } else {
      device = "Desktop";
    }

    dispatch(saveDeviceType(device));
  }, []);

  const handlerSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setSelectedMakeTYP(props.make));
    dispatch(setSelectedModelTYP(props.model));
    dispatch(setZipCodeTYP(props.zip));
    router.push(`/thankyou`);
  };

  useEffect(() => {
    month.length === 0 && dispatch(setMonth());
    dispatch(setMakes(makes));
    dispatch(saveModels(models));
    dispatch(setSelectedMake(make.value));
    dispatch(setSelectedModel(model.value));
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
      <DefaultLayout>
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
  const ua = useUserAgent(context.req.headers["user-agent"]);
  const cookies = cookie.parse(context.req.headers.cookie);
  const utsCookie = cookies["uts-session"];
  const utsValues = utsCookie && JSON.parse(decodeURI(utsCookie));

  const { origin } = absoluteUrl(context.req, context.req.headers.host);
  const cxtMake = context.query.make;
  const cxtModel = context.query.model;
  const cxtZip = context.query.zipcode;
  const secondary = context.query.sl;

  const make = makes.find((item) => item.value === cxtMake);

  let models = [];
  let model: IModel;
  if (make) {
    models = await fetch(`${origin}/api/models/${cxtMake}`).then<IModel[]>((r) => r.json());
    model = models.find((item) => item.value === cxtModel);
  }

  const sourceId = secondary ? config.altSourceId : config.sourceId;
  const url = `${config.apiBaseUrl}/api/dealers?sourceId=${sourceId}
    &make=${encodeURIComponent(make.name)}&model=${encodeURIComponent(model.name)}
    &year=${model.year}&zip=${cxtZip}&sessionId=${utsValues?.utss}`;

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

  return {
    props: {
      models,
      make,
      model,
      zip: cxtZip,
      ua,
      useragent: ua.source,
      dealers,
    },
  };
};

export default PageStepTwo;
