import { ApplicationInsights } from '@microsoft/applicationinsights-web';

import { config } from './config';

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: config.appInsightsKey,
  },
});

appInsights.loadAppInsights();
export { appInsights };
