import { IModel } from '@/def/IModel';
import { config } from '@/util/config';
import { IMake } from '../definitions/IMake';
import getMonth from '@/util/get-month';

export const getMakes = async (): Promise<IMake[]> => {
  const response = await fetch(`${config.apiBaseUrl}/makes`);

  return response.json();
};

export const getModelsByMake = async (make: string | string[]): Promise<IModel[]> => {
  const response = await fetch(`${config.apiBaseUrl}/models/${make}`);

  return response.json();
};

export const getCampaignData = async (
  campaign: string | string[],
  funnelStep: string,
  make = '',
  model = ''
): Promise<any> => {
  if (!campaign || !funnelStep || !config.activateGraphCMS) {
    return;
  }
  const currentMonth = getMonth();
  const query = {
    query: `query MyQuery {personalizations(where: {${campaign ? 'campaign_contains_all: ' + campaign : ''}, ${
      funnelStep ? 'funnelStep: ' + funnelStep : ''
    }}) {    h1Headline    h2Headline    buttonCta  heroImage  banner { banner }websites(where: {websiteName: "${
      config.siteUrl
    }"}) {      websiteName    }   }}`,
    variables: null,
    operationName: 'MyQuery',
  };

  return await fetch(config.graphCMSUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: config.graphCMSAuth,
      'gcms-stage': 'PUBLISHED',
    },
    body: JSON.stringify(query),
  })
    .then((response: Response): any => {
      if (!response.ok) throw new Error(`Error getting data (${response.status})`);
      return response.json();
    })
    .then((response) => {
      let result = response.data.personalizations;
      if (result) {
        result = JSON.stringify(result).replaceAll('[MONTH]', currentMonth);
        return JSON.parse(result);
      } else {
        throw new Error('Problem getting personalization data');
      }
    })
    .catch((error) => console.error(error));
};

export const getDealers = async (sourceId, make, model, year, zipcode, utss): Promise<any> => {
  const response = await fetch(
    `${config.apiFunctionUrl}/api/dealers?sourceId=${sourceId}&make=${make}&model=${model}&year=${year}&zip=${zipcode}&sessionId=${utss}`
  );

  return response.json();
};
