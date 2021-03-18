// Packages
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import useScript from "@/src/hooks/useScript";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

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

  const router = useRouter();

  const { make: ctxMake, model: ctxModel, zipcode } = router.query;

  const utsCookie = Cookies.get("uts-session");
  const utsValues = utsCookie && JSON.parse(decodeURI(utsCookie));
  const utss = utsValues?.utss || router.query.utss;

  useEffect(() => {
    router.query.rd && window.AutoWeb.reload(make.name, model.name, zipcode);
  }, [router]);

  const makeName = make?.name || ctxMake;
  const modelName = model?.name || ctxModel;

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
          __html: `<div class="awlistings" aw-implement="1505" 
            aw-category="1" 
            aw-make="${makeName}" 
            aw-model="${modelName}" 
            aw-zipcode="${zipcode}"
            aw-utrack="${utss}"
          ></div>`,
        }}
      ></div>
      {useScript("//cdn.awadserver.com/widget/js/awloader.min.js", "3382")}
      {buttonClick && <RedirectFas make={make.name} model={model.name} zip={zipcode} />}
    </ThemeProvider>
  );
};

export default FAS;
