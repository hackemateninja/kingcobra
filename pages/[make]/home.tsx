// Packages
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import * as QueryString from 'query-string';
import Skeleton from 'react-loading-skeleton';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import { RootState } from '@/def/TRootReducer';
import { IPreload } from '@/def/IMetaData';

// Layout
import DefaultLayout from '@/layout/default';

// Slices
import { setMakes, setSelectedMake, saveModels, setSelectedModel, setButtonText } from '@/redux/slices/step-one';
import { setDataLoading } from '@/redux/slices/site';

// Components
import StepOne from '@/comp/steps/step-one';
import Title from '@/comp/title';
import SubTitle from '@/comp/subtitle';
import MetaData from '@/comp/meta-data';
import Redirect from '@/comp/redirect';
import ReplaceMakeModel from '@/comp/replace-make-model';

// Utilities
import setSuffix from '@/util/suffix';
import combineAnS from '@/util/combine-ans';
import setPrefix from '@/util/prefix';

// Styles
import GlobalStyles from '@/theme/global';
import { getCampaignData } from '@/src/services';

const Home: FC<IPlainObject> = ({ makes, models, make, model, year, month, quotes }) => {
  if (!make) {
    return <Redirect />;
  }

  const dispatch = useDispatch();
  const router = useRouter();

  const metadata = useSelector((state: RootState) => state.metadata);
  const stepOne = useSelector((state: RootState) => state.stepOne.data);
  const dataLoading = useSelector((state: RootState) => state.site.ui.dataLoading);
  const { prefix, separator, description, keywordsPnS } = metadata.model;
  const [enteredHeadline1, setEnteredHeadline1] = useState(null);
  const [enteredHeadline2, setEnteredHeadline2] = useState(null);
  const [enteredCampaignImage, setCampaignImage] = useState(null);
  const [enteredBanner, setBanner] = useState(null);
  const [campaignData, setCampaignData] = useState(null);
  const stateMake = stepOne.selectedMake.name ? stepOne.selectedMake.name : '';
  const stateModel = stepOne.selectedModel.name ? stepOne.selectedModel.name : '';
  const { utm_campaign, primary_sid, thankyou_sid } = router.query;

  const handlerSubmit = () => {
    const { selectedMake, selectedModel, zipcode } = stepOne;
    const { zip } = zipcode;

    const queryparams = QueryString.parse(location.search);
    const { utsu, utss } = queryparams;
    const query = (utsu && utss && `?utsu=${utsu}&utss=${utss}`) || '';
    const primaryId = primary_sid ? `primary_sid=${primary_sid}` : '';
    const secondaryId = thankyou_sid ? `thankyou_sid=${thankyou_sid}` : '';
    const utmParameter = utm_campaign ? `utm_campaign=${utm_campaign}` : '';
    const urlBuild =
      utmParameter +
      (primaryId && utmParameter ? `&${primaryId}` : primaryId) +
      (secondaryId && (utmParameter || primaryId) ? `&${secondaryId}` : secondaryId);
    let campaignQuery = '';
    if (utm_campaign || primaryId || secondaryId) {
      if (query === '') {
        campaignQuery = '?' + urlBuild;
      } else {
        campaignQuery = '&' + urlBuild;
      }
    }

    window.open(
      `/s2/${selectedMake.seoName}/${selectedModel.seoName}/${zip}${query}${campaignQuery}`,
      '',
      `width=${screen.width},height=${screen.height}`
    );

    router.push(`/fas/${selectedMake.seoName}/${selectedModel.seoName}/${zip}${query}${campaignQuery}`);
  };

  useEffect(() => {
    dispatch(setMakes(makes));
    dispatch(setSelectedMake(make.seoName));
    dispatch(saveModels(models));
    dispatch(setSelectedModel(model?.seoName));
  }, []);

  useEffect(() => {
    if (utm_campaign || primary_sid || thankyou_sid) {
      const step = router.pathname === '/[make]/[model]' ? 'model_page' : 'make_page';
      setGraphData(step);
      return;
    }
    if (router.isReady) dispatch(setDataLoading(false));
  }, [utm_campaign, primary_sid, thankyou_sid, router.isReady]);

  const setGraphData = async (step: string) => {
    const result = await getCampaignData(utm_campaign, step, stepOne.selectedMake?.name, stepOne.selectedModel?.name);
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

  const name = model ? `${make.name} ${model.name}` : make.name;
  const title = `${setSuffix(prefix, name, ` ${separator} `)} ${separator} ${metadata.name}`;
  const desc = combineAnS(description, name);
  const prekeys = setPrefix(keywordsPnS.prefix, name, ', ');
  const sufkeys = setSuffix(keywordsPnS.suffix, name, ', ');
  const keys = `${prekeys}, ${sufkeys}`;
  const preload: IPreload[] = [
    { elem: model?.mediumJpg || make.mediumJpg, type: 'image' },
    { elem: model?.smallJpg || make.smallJpg, type: 'image' },
  ];
  return (
    <>
      <MetaData title={title} description={desc} keywords={keys} preload={preload} />
      <GlobalStyles />
      <DefaultLayout year={year} month={month} banner={enteredBanner}>
        <Title>
          {dataLoading ? (
            <Skeleton />
          ) : enteredHeadline1 ? (
            <ReplaceMakeModel text={enteredHeadline1} />
          ) : (
            <>
              Huge Markdowns {stateMake && 'on'} {model ? `${stateMake} ${stateModel}` : stateMake} This Month!
            </>
          )}
        </Title>
        <SubTitle>
          {dataLoading ? (
            <Skeleton />
          ) : enteredHeadline2 ? (
            <ReplaceMakeModel text={enteredHeadline2} />
          ) : (
            <>
              Compare Prices from Multiple {stateMake} Dealers and <strong>Get the Lowest Price</strong>
            </>
          )}
        </SubTitle>
        <StepOne
          makes={makes}
          models={models}
          make={make.seoName}
          model={model?.seoName}
          image={model?.mediumJpg}
          smallImage={model?.smallJpg}
          campaignImage={enteredCampaignImage}
          onSubmit={handlerSubmit}
          quotes={quotes}
        />
      </DefaultLayout>
    </>
  );
};

export default Home;
