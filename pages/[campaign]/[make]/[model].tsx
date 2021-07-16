// Packages
import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useState } from 'react';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import { IMake } from '@/def/IMake';
import { IModel } from '@/def/IModel';

// Data
import metadataSource from '@/data/metadata';

// Components
import Home from '@/comp/home';
import Redirect from '@/comp/redirect';

// Services
import { getCampaignData, getCampaigns, getMakes, getModelsByMake } from '@/src/services';

// Context
import { useAppContext } from '@/ctx/app-context';

// Utilities
import getYear from '@/util/get-year';
import getMonth from '@/util/get-month';
import randomizer from '@/util/random-quotes';
import combineAnS from '@/util/combine-ans';
import setPrefix from '@/util/prefix';
import setSuffix from '@/util/suffix';
import parseGraphData from '@/util/parse-graph-data';

const ModelHomePage: React.FC<IPlainObject> = (props) => {
  const { month, year, quotes, makes, make, models, model, campaign, graphData } = props;
  const {
    state: { selectedMake, selectedModel },
  } = useAppContext();
  const [currentMake, setCurrentMake] = useState(make);
  const [currentModel, setCurrentModel] = useState(model);

  useEffect(() => {
    if (selectedMake.name) {
      setCurrentMake(selectedMake);
      if (selectedModel.makeName !== selectedMake.name) setCurrentModel({});
    }
  }, [selectedMake]);
  useEffect(() => selectedModel.name && setCurrentModel(selectedModel), [selectedModel]);

  if (!model || !make) {
    return <Redirect />;
  }

  // Default page content
  const defaultTitle = (
    <>
      Huge Markdowns on {currentMake.name} {currentModel.name} This Month!
    </>
  );
  const defaultSubtitle = (
    <>
      Compare Prices from Multiple {currentMake.name} Dealers and <strong>Get the Lowest Price</strong>
    </>
  );

  // Metadata
  const { prefix, separator, description, keywordsPnS } = metadataSource.model;
  const preKeys = setPrefix(keywordsPnS.prefix, make.name, ', ');
  const sufKeys = setSuffix(keywordsPnS.suffix, make.name, ', ');
  const preload = [
    { type: 'image', elem: model?.mediumJpg },
    { type: 'image', elem: model?.smallJpg },
  ];

  return (
    <Home
      year={year}
      month={month}
      quotes={quotes}
      makes={makes}
      models={models}
      preSelectedMake={make}
      preSelectedModel={model}
      title={
        graphData.h1Headline ? parseGraphData(graphData.h1Headline, currentMake.name, currentModel.name) : defaultTitle
      }
      subTitle={
        graphData.h2Headline
          ? parseGraphData(graphData.h2Headline, currentMake.name, currentModel.name)
          : defaultSubtitle
      }
      formButtonText={graphData.buttonCta}
      campaignImage={graphData.heroImage}
      banner={graphData.banner}
      campaign={campaign}
      metadata={{
        title: `${setSuffix(prefix, make.name, ` ${separator} `)} ${separator} ${metadataSource.name}`,
        description: combineAnS(description, make.name),
        keywords: `${preKeys}, ${sufKeys}`,
        preload,
      }}
    />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const makes = await getMakes();
  const campaigns = await getCampaigns();
  const modelsByMakes = await Promise.all(
    makes.map(async (make) => ({
      [make.seoName]: await getModelsByMake(make.seoName),
    }))
  );

  const paths = [];
  campaigns.forEach((campaign) => {
    makes.forEach((make) => {
      const models = modelsByMakes.find((item) => item[make.seoName])[make.seoName];
      models.forEach((model: IModel) => paths.push({ params: { campaign, make: make.seoName, model: model.seoName } }));
    });
  });

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const makes: IMake[] = await getMakes();
  const make = makes.find((item) => item.seoName === params.make);
  const models: IModel[] = await getModelsByMake(make?.seoName);
  const model = models && models.find((item) => item.seoName === params.model);

  const year = getYear();
  const month = getMonth();
  const quotes = randomizer();

  const { campaign } = params;
  const graphData = await getCampaignData(campaign, 'model_page');

  return {
    props: {
      month,
      year,
      quotes,
      makes: makes ?? null,
      make: make ?? null,
      models: models ?? null,
      model: model ?? null,
      campaign,
      graphData,
    },
    revalidate: 3600,
  };
};

export default ModelHomePage;
