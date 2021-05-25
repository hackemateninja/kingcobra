// Packages
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import * as QueryString from 'query-string';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import { RootState } from '@/def/TRootReducer';
import { IPreload } from '@/def/IMetaData';

// Layout
import DefaultLayout from '@/layout/default';

// Slices
import { setMakes, setSelectedMake, saveModels, setSelectedModel, setButtonText } from '@/redux/slices/step-one';

// Components
import StepOne from '@/comp/steps/step-one';
import Title from '@/comp/title';
import SubTitle from '@/comp/subtitle';
import MetaData from '@/comp/meta-data';
import Redirect from '@/comp/redirect';

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
  const { prefix, separator, description, keywordsPnS } = metadata.model;
  const [enteredHeadline1, setEnteredHeadline1] = useState(null);
  const [enteredHeadline2, setEnteredHeadline2] = useState(null);
  const [enteredCampaignImage, setCampaignImage] = useState(null);
  const [enteredBanner, setBanner] = useState(null);

  const handlerSubmit = () => {
    const { selectedMake, selectedModel, zipcode } = stepOne;
    const { zip } = zipcode;

    const queryparams = QueryString.parse(location.search);
    const { utsu, utss } = queryparams;
    const query = (utsu && utss && `?utsu=${utsu}&utss=${utss}`) || '';

    window.open(
      `/s2/${selectedMake.seoName}/${selectedModel.seoName}/${zip}${query}`,
      '',
      `width=${screen.width},height=${screen.height}`
    );

    router.push(`/fas/${selectedMake.seoName}/${selectedModel.seoName}/${zip}${query}`);
  };

  useEffect(() => {
    dispatch(setMakes(makes));
    dispatch(setSelectedMake(make.seoName));
    dispatch(saveModels(models));
    dispatch(setSelectedModel(model?.seoName));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  getCampaignData(router.query as any, make?.name, model?.name).then((result) => {
    if (result && result[0]) {
      const data = result[0];
      setEnteredHeadline1(data.h1Headline);
      setEnteredHeadline2(data.h2Headline);
      setCampaignImage(data.heroImage);
      setBanner(data.banner.banner);
      dispatch(setButtonText(data.buttonCta));
    }
  });

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
          {enteredHeadline1 && <div dangerouslySetInnerHTML={{ __html: enteredHeadline1 }}></div>}
          {!enteredHeadline1 && <> Huge Markdowns on {name} This Month! </>}
        </Title>
        <SubTitle>
          {enteredHeadline2 && <div dangerouslySetInnerHTML={{ __html: enteredHeadline2 }}></div>}
          {!enteredHeadline2 && (
            <>
              Compare Prices from Multiple {make.name} Dealers and <strong>Get the Lowest Price</strong>
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
