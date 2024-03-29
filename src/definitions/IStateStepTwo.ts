import { IDealer } from '@/def/IDealers';

interface IDataStepTwo {
  dealers: IDealer[];
  selectedDealers: IDealer[];
  leadDealers: IDealer[];
  first: string;
  last: string;
  phone: string;
  address: string;
  email: string;
  coverage: boolean;
  sourceId: string;
  altSourceId: string;
  device: 'Unknown' | 'Mobile' | 'Tablet' | 'Desktop';
  transactionId: string;
  sendInfo: boolean;
}

interface IUIStepTwo {
  buttonS2: string;
  buttonS3: string;
  boxActive: 'dealers' | 'form';
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  firstSuggested: boolean;
  showSuggested: boolean;
}

export interface IStateStepTwo {
  data: IDataStepTwo;
  ui: IUIStepTwo;
}
