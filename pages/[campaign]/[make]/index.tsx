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

const MakeHomePage: React.FC<IPlainObject> = (props) => {
  const { month, year, quotes, makes, make, models, campaign, graphData } = props;
  const {
    state: { selectedMake },
  } = useAppContext();
  const [currentMake, setCurrentMake] = useState(make);

  useEffect(() => selectedMake.name && setCurrentMake(selectedMake), [selectedMake]);
  
  const [makesState, setMakesState] = useState();
  const [modelsState, setModelsState] = useState();
  
  const bodyTypes = [
    "suv",
    "truck",
    "convertible",
    "coupe",
    "hybrid",
    "minivan/van",
    "minivan",
    "van",
    "sedan",
    "wagon"
  ];
  
  useEffect(() => {
    (async ()=> {
      const apiMake = selectedMake.name ? selectedMake.name.toLowerCase() : make.name.toLowerCase();
      const data = await fetch(`/api/campaing?make=${apiMake}&bodyType=${campaign}`)
      const {makes, models} = await data.json();
      
      if(bodyTypes.includes(campaign)) {
        setMakesState(makes)
        setModelsState(models)
      }else {
        setMakesState(props.makes)
        setModelsState(props.models)
      }
      
    })()
  },[selectedMake.name])
  

  if (!make) {
    return <Redirect />;
  }

  // Default page content
  const defaultTitle = <>Huge Markdowns on {currentMake.name} This Month!</>;
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
    { type: 'image', elem: make?.mediumJpg },
    { type: 'image', elem: make?.smallJpg },
  ];

  return (
    makesState && <Home
        year={year}
        month={month}
        quotes={quotes}
        makes={makesState}
        models={modelsState}
        preSelectedMake={make}
        title={graphData.h1Headline ? parseGraphData(graphData.h1Headline, currentMake.name) : defaultTitle}
        subTitle={graphData.h2Headline ? parseGraphData(graphData.h2Headline, currentMake.name) : defaultSubtitle}
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

  const paths = [];
  campaigns.forEach((campaign) => {
    makes.forEach((make) => paths.push({ params: { campaign, make: make.seoName } }));
  });

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const makes: IMake[] = await getMakes();
  const make = makes.find((item) => item.seoName === params.make);
  const models: IModel[] = await getModelsByMake(make?.seoName);

  const year = getYear();
  const month = getMonth();
  const quotes = randomizer();

  const { campaign } = params;
  const graphData = await getCampaignData(campaign, 'make_page');

  return {
    props: {
      month,
      year,
      quotes,
      makes: makes ?? null,
      make: make ?? null,
      models: models ?? null,
      campaign,
      graphData,
    },
    revalidate: 3600,
  };
};

export default MakeHomePage;
