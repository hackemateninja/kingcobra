// Packages
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import absoluteUrl from "next-absolute-url";
import useScript from "@/src/hooks/useScript";
import { useUserAgent } from "next-useragent";
import Cookies from "js-cookie";

// Data
import { makes } from "@/data/makes";

// Definitions
import { IPlainObject } from "@/def/IPlainObject";
import { RootState } from "@/def/TRootReducer";

// Layout
import DefaultLayout from "@/layout/default";

// Slices
import { setMonth } from "@/redux/slices/site";
import { saveModels, setMakes, setSelectedMake, setSelectedModel, setZipCode } from "@/redux/slices/step-one";
import { saveDeviceType, setDealers } from "@/redux/slices/step-two";
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
  const stepTwo = useSelector((state: RootState) => state.stepTwo.data);
  const stepTwoUi = useSelector((state: RootState) => state.stepTwo.ui);
  const zipcode = useSelector((state: RootState) => state.stepOne.data.zipcode);

  const { models, make, model, zip, ua } = props;
  const { prefix, separator, description, keywordsPnS } = metadata.model;
  const { loading } = stepTwoUi;
  const { coverage, dealers } = stepTwo;

  const name = `${make.name} ${model.name}`;
  const title = `${setSuffix(prefix, name, ` ${separator} `)} ${separator} ${metadata.name}`;
  const noCoverageTitle = `No Coverage ${separator} ${metadata.name}`;
  const desc = combineAnS(description, name);
  const prekeys = setPrefix(keywordsPnS.prefix, name, ", ");
  const sufkeys = setSuffix(keywordsPnS.suffix, name, ", ");
  const keys = `${prekeys}, ${sufkeys}`;

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

  useEffect(() => {
    if (dealers.length) {
      dispatch(setZipCode(props.zip));
    }
  }, [dealers]);

  const handlerSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setSelectedMakeTYP(props.make));
    dispatch(setSelectedModelTYP(props.model));
    dispatch(setZipCodeTYP(props.zip));
    router.push(`/thankyou`);
  };

  useEffect(() => {
    const utsCookie = Cookies.get("uts-session");
    const utsValues = utsCookie && JSON.parse(decodeURI(utsCookie));

    month.length === 0 && dispatch(setMonth());
    dispatch(setMakes(makes));
    dispatch(saveModels(models));
    dispatch(setSelectedMake(make.value));
    dispatch(setSelectedModel(model.value));
    dispatch(
      setDealers({
        make: make.name,
        model: model.name,
        sourceId: stepTwo.sourceId || config.sourceId,
        year: model.year,
        zip: zip,
        sessionId: utsValues?.utss,
      })
    );
  }, []);

  const city = zipcode.zip && `${zipcode.city}, ${zipcode.state} ${zipcode.zip}`;

  return (loading === "failed" || loading === "succeeded") && !coverage ? (
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
  ) : (
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
      {useScript("")}
    </ThemeProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ua = useUserAgent(context.req.headers["user-agent"]);

  const { origin } = absoluteUrl(context.req, context.req.headers.host);
  const cxtMake = context.query.make;
  const cxtModel = context.query.model;
  const cxtZip = context.query.zipcode;
  const make = makes.filter((item) => item.value === cxtMake);

  let models = [];
  let model = [];
  if (make.length) {
    const resModels = await fetch(`${origin}/api/models/${cxtMake}`);
    models = await resModels.json();
    model = models.filter((item) => item.value === cxtModel);
  }

  return {
    props: {
      models: models.length !== 0 ? models : null,
      make: make.length !== 0 ? make[0] : null,
      model: model.length !== 0 ? model[0] : null,
      zip: cxtZip,
      ua: ua,
      useragent: ua.source,
    },
  };
};

export default PageStepTwo;
