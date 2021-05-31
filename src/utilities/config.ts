import { IConfig } from '@/def/IConfig';

export const config: IConfig = {
  apiBaseUrl: process.env.NEXT_PUBLIC_FUNCTIONS_BASE,
  apiFunctionUrl: process.env.NEXT_PUBLIC_FUNCTION_BASE,
  UTSConfig: {
    applicationId: process.env.NEXT_PUBLIC_UTS_APPLICATION_ID,
    trackingApi: process.env.NEXT_PUBLIC_UTS_TRACKING_API,
    utsUrl: process.env.NEXT_PUBLIC_UTS_URL,
  },
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  ssAuthToken: process.env.NEXT_PUBLIC_SS_TOKEN,
  mPulseToken: process.env.NEXT_PUBLIC_MPULSE_TOKEN,
  sourceId: process.env.NEXT_PUBLIC_SOURCE_ID,
  altSourceId: process.env.NEXT_PUBLIC_ALTERNATIVE_SOURCE_ID,
  appInsightsKey: process.env.NEXT_PUBLIC_APP_INSIGHTS_KEY,
  activateVWO: process.env.NEXT_PUBLIC_USE_VWO === 'true',
  activateGTM: process.env.NEXT_PUBLIC_USE_GTM === 'true',
  graphCMSAuth: process.env.NEXT_PUBLIC_AUTH_GRAPHCMS,
  graphCMSUrl: process.env.NEXT_PUBLIC_GRAPHCMS_URL,
  activateGraphCMS: process.env.NEXT_PUBLIC_USE_GRAPHCMS === 'true',
};
