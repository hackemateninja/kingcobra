// Packages
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import { IMake } from '@/def/IMake';

// Components
import Home from '@/comp/home';

// Utilities
import getMonth from '@/util/get-month';
import getYear from '@/util/get-year';
import randomizer from '@/util/random-quotes';
import parseGraphData from '@/util/parse-graph-data';

// Services
import { getCampaigns, getCampaignData, getMakes } from '@/src/services';

const CampaignHomePage: React.FC<IPlainObject> = (props) => {
  const { month, year, quotes, makes, campaign, graphData } = props;
  const [makesState, setMakesState] = useState();
  const [isCampaignState, setIsCampaignState] = useState<boolean>();

  const bodyTypes = [
    'suv',
    'truck',
    'convertible',
    'coupe',
    'hybrid',
    'minivan/van',
    'minivan',
    'van',
    'sedan',
    'wagon',
  ];

  useEffect(() => {
    (async () => {
      const data = await fetch(`/api/campaing?bodyType=${campaign}`);
      const { makes } = await data.json();

      if (bodyTypes.includes(campaign)) {
        setMakesState(makes);
        setIsCampaignState(true);
      } else {
        setMakesState(props.makes);
        setIsCampaignState(false);
      }
    })();
  }, []);

  return (
    makesState && (
      <Home
        year={year}
        month={month}
        quotes={quotes}
        makes={makesState}
        title={graphData.h1Headline && parseGraphData(graphData.h1Headline)}
        subTitle={graphData.h2Headline && parseGraphData(graphData.h2Headline)}
        formButtonText={graphData.buttonCta}
        campaignImage={graphData.heroImage}
        banner={graphData.banner}
        campaign={campaign}
        isCampaign={isCampaignState}
      />
    )
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const campaigns = await getCampaigns();

  const paths = campaigns.map((campaign) => ({
    params: { campaign },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const makes: IMake[] = await getMakes();

  const month = getMonth();
  const year = getYear();
  const quotes = randomizer();

  const { campaign } = params;
  const graphData = await getCampaignData(campaign, 'unbranded_page');

  return {
    props: { month, year, quotes, makes, campaign, graphData },
    revalidate: 3600,
  };
};

export default CampaignHomePage;
