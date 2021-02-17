// Packages
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import useScript from "@/src/hooks/useScript";
import { GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

// Definitions
import { IPlainObject } from "@/def/IPlainObject";
import { RootState } from "@/def/TRootReducer";

// Components
import RedirectFas from "@/comp/redirect/fas/";

// Styles
import GlobalStyles from "@/theme/global";
import CarcomTheme from "@/theme/carcom";

declare const window: any;

const FAS: React.FC<IPlainObject> = (props) => {
  const make = useSelector((state: RootState) => state.stepOne.data.selectedMake);
  const model = useSelector((state: RootState) => state.stepOne.data.selectedModel);
  const buttonClick = useSelector((state: RootState) => state.thankyou.ui.buttonClick);
  const date = new Date();
  const ms = date.getMilliseconds();

  const router = useRouter();

  useEffect(() => {
    router.query.rd && window.AutoWeb.reload(make.value, model.value, props.zip);
  }, [router]);

  return (
    <ThemeProvider theme={CarcomTheme}>
      <Head>
        <title>Get Comparable Pricing from Local Dealers</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5cb1e5" />
        <link rel="manifest" type="application/json" href="/favicon/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      </Head>
      <GlobalStyles />
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html:
            `<div class="awlistings" aw-implement="1505" aw-category="1" aw-make="` +
            props.make +
            `" aw-model="` +
            props.model +
            `" aw-zipcode="` +
            props.zip +
            `"></div>`,
        }}
      ></div>
      {useScript("//cdn.awadserver.com/widget/js/awloader.min.js", "3382")}
      {buttonClick && <RedirectFas make={make.value} model={model.value} zip={props.zip} />}
    </ThemeProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cxtMake = context.query.make;
  const cxtModel = context.query.model;
  const cxtZip = context.query.zipcode;

  return {
    props: {
      make: cxtMake,
      model: cxtModel,
      zip: cxtZip,
    },
  };
};

export default FAS;
