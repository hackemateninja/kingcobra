// Packages
import { FC, useEffect } from 'react';
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
import { setMakes, setSelectedMake, saveModels, setSelectedModel } from '@/redux/slices/step-one';

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

const Home: FC<IPlainObject> = ({ makes, models, make, model, year, month, quotes }) => {
  if (!make) {
    return <Redirect />;
  }

  const dispatch = useDispatch();
  const router = useRouter();

  const metadata = useSelector((state: RootState) => state.metadata);
  const stepOne = useSelector((state: RootState) => state.stepOne.data);
  const { prefix, separator, description, keywordsPnS } = metadata.model;

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
      <DefaultLayout year={year} month={month}>
        <Title>Huge Markdowns on {name} This Month!</Title>
        <SubTitle>
          Compare Prices from Multiple {make.name} Dealers and <strong>Get the Lowest Price</strong>
        </SubTitle>
        <StepOne
          makes={makes}
          models={models}
          make={make.seoName}
          model={model?.seoName}
          image={model?.mediumJpg}
          smallImage={model?.smallJpg}
          onSubmit={handlerSubmit}
          quotes={quotes}
        />
      </DefaultLayout>
    </>
  );
};

export default Home;
