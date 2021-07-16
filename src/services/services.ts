import { config } from '@/util/config';
import getMonth from '@/util/get-month';

import { IModel } from '@/def/IModel';
import { IMake } from '@/def/IMake';
import { IMldDealersResponse, IMldLeadResponse } from '@/def/IMldResponse';
import { IPostLeadParams } from '@/def/IPostLeadParams';

export const getMakes = async (): Promise<IMake[]> => {
  const response = await fetch(`${config.apiBaseUrl}/makes`);

  return response.json();
};

export const getModelsByMake = async (make: string | string[]): Promise<IModel[]> => {
  const response = await fetch(`${config.apiBaseUrl}/models/${make}`);

  return response.json();
};

export const getCampaigns = async (): Promise<string[]> => {
  // const campaigns = ['test', 'lease'];
  const campaigns = [];

  campaigns.push(config.defaultCampaignName);

  return campaigns;
};

export const getCampaignData = async (campaign: string | string[], funnelStep: string): Promise<any> => {
  if (campaign === config.defaultCampaignName) {
    return {};
  }

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

  const result = await fetch(config.graphCMSUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: config.graphCMSAuth,
      'gcms-stage': 'PUBLISHED',
    },
    body: JSON.stringify(query),
  })
    .then((response: Response): any => {
      if (!response.ok)
        throw new Error(`Error getting Campaign Data (${campaign}) (${funnelStep}) (${response.status})`);
      return response.json();
    })
    .then((response) => {
      let result = response.data.personalizations;

      if (result && result.length) {
        result = JSON.stringify(result).replace(/\[MONTH\]/g, currentMonth);
        return JSON.parse(result);
      } else {
        throw new Error('Problem getting Campaign personalization data');
      }
    })
    .catch((error) => console.error(error));

  if (!result || !result[0]) {
    return {};
  }

  return result[0];
};

export const getDealers = async (
  sourceId: string,
  make: string,
  model: string,
  year: number,
  zipcode: string,
  utss: string
): Promise<IMldDealersResponse> => {
  const response = await fetch(
    `${config.apiFunctionUrl}/api/dealers?sourceId=${sourceId}&make=${make}&model=${model}&year=${year}&zip=${zipcode}&sessionId=${utss}`
  );

  return response.json();
};

export const postLead = async (lead: IPostLeadParams): Promise<IMldLeadResponse> => {
  const url = `${config.apiFunctionUrl}/api/lead`;
  const { make, model } = lead.vehicle;
  const { zip } = lead.customer;

  return await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        // appInsights.trackTrace({
        //   message: `${response.statusText} - Something went wrong posting lead: ${make}-${model}-${zip}`,
        //   properties: {
        //     make: make,
        //     model: model,
        //     zip: zip,
        //   },
        //   severityLevel: SeverityLevel.Error,
        // });

        throw new Error(`Something went wrong posting lead: ${make}-${model}-${zip}`);
      }
    })
    .catch((error) => {
      // appInsights.trackException({ exception: error, properties: { make: make, model: model, zip: zip } });
      console.error(error);
    });
};

export const getZipCodeInfo = async (zipCode: string): Promise<any> => {
  if (zipCode !== '' && zipCode !== '99999') {
    return await fetch(
      `https://us-zipcode.api.smartystreets.com/lookup?auth-id=${config.ssAuthToken}&zipcode=${zipCode}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          // appInsights.trackTrace({
          //   message: `${response.statusText} - Something went wrong getting zipcode: ${zip}`,
          //   properties: {
          //     zip: zip,
          //   },
          //   severityLevel: SeverityLevel.Error,
          // });

          throw new Error(`Something went wrong getting zipcode: ${zipCode}`);
        }
      })
      .catch((error) => {
        // appInsights.trackException({ exception: error, properties: { zip: zipcode } });
        console.error(error);
      });
  } else if (zipCode === '99999') {
    return [
      {
        zipcodes: [{ default_city: 'City', state_abbreviation: 'ST', zipcode: zipCode }],
      },
    ];
  } else {
    return [];
  }
};
