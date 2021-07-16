// Packages
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import { IMake } from '@/def/IMake';
import { IModel } from '@/def/IModel';

// Context
import { useAppContext } from '@/ctx/app-context';

// Components
import DynamicAdWidget from '@/comp/dynamic-ad-widget';

// Utilities
import useBroadcast from '@/src/hooks/useBroadcast';

// Styles
import GlobalStyles from '@/theme/global';

declare const window: any;

const FAS: React.FC<IPlainObject> = (props) => {
  const {
    state: { selectedMake, selectedModel, zipCodeInfo },
  } = useAppContext();
  const [fasMessage] = useBroadcast('fas');
  const router = useRouter();

  const [typMake, setTypMake] = useState<IMake>();
  const [typModel, setTypModel] = useState<IModel>();
  const [typZipcode, setTypZipcode] = useState<string>();
  const [typCampaign, setTypCampaign] = useState<string>();

  const { make: makeName, model: modelName, zipcode } = router.query;

  const utsCookie = Cookies.get('uts-session');
  const utsValues = utsCookie && JSON.parse(decodeURI(utsCookie));
  const utss = utsValues?.utss || router.query.utss;

  useEffect(() => {
    const make = typMake?.name || selectedMake?.name || (makeName as string);
    const model = typModel?.name || selectedModel?.name || (modelName as string);
    const zipCode = typZipcode || zipCodeInfo?.zip || (zipcode as string);

    // window.Autoweb comes from GTM injected script, reload will fail if GTM is inactive
    router.query.rd && window?.AutoWeb?.reload && window.AutoWeb.reload(make, model, zipCode);
  }, [router]);

  useEffect(() => {
    if (fasMessage) {
      const { make: newMake, model: newModel, zipcode: newZipcode, campaign: newCampaign } = fasMessage as IPlainObject;

      setTypMake(newMake);
      setTypModel(newModel);
      setTypZipcode(newZipcode);
      setTypCampaign(newCampaign);

      router.replace(`/${newCampaign}/fas/${newMake.seoName}/${newModel.seoName}/${newZipcode}?rd=true`);
    }
  }, [fasMessage]);

  return (
    <>
      <Head>
        <title>Get Comparable Pricing from Local Dealers</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5cb1e5" />
        <link rel="manifest" type="application/json" href="/favicon/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0,user-scalable=5" />
      </Head>
      <GlobalStyles />
      <DynamicAdWidget
        make={typMake?.name || selectedMake?.name || (makeName as string)}
        implement="1505"
        model={typModel?.name || selectedModel?.name || (modelName as string)}
        zip={typZipcode || (zipcode as string)}
        utss={utss}
        category="1"
      />
    </>
  );
};

export default FAS;
