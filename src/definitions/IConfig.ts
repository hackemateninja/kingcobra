interface IUTSConfig {
  applicationId: string;
  trackingApi: string;
  utsUrl: string;
}

export interface IConfig {
  apiBaseUrl: string;
  UTSConfig: IUTSConfig;
  gtmId: string;
  ssAuthToken: string;
  sourceId: string;
  altSourceId: string;
  appInsightsKey: string;
}
