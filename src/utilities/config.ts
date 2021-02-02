import { IConfig } from "@/def/IConfig";

export const config: IConfig = {
  apiBaseUrl: process.env.NEXT_PUBLIC_FUNCTIONS_BASE,
  UTSConfig: {
    applicationId: process.env.NEXT_PUBLIC_UTS_APPLICATION_ID,
    trackingApi: process.env.NEXT_PUBLIC_UTS_TRACKING_API,
    utsUrl: process.env.NEXT_PUBLIC_UTS_URL,
  },
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  ssAuthToken: process.env.NEXT_PUBLIC_SS_TOKEN,
  sourceId: process.env.NEXT_PUBLIC_SOURCE_ID,
};
