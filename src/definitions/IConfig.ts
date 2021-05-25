interface IUTSConfig {
  applicationId: string;
  trackingApi: string;
  utsUrl: string;
}

export interface IConfig {
  apiBaseUrl: string;
  apiFunctionUrl: string;
  UTSConfig: IUTSConfig;
  gtmId: string;
  ssAuthToken: string;
  mPulseToken: string;
  sourceId: string;
  altSourceId: string;
  appInsightsKey: string;
  activateVWO: boolean;
  activateGTM: boolean;
  graphCMSAuth: string;
  graphCMSUrl: string;
}
