export interface IDealer {
  id: string;
  name: string;
  address?: string;
  isChecked?: boolean;
  one?: boolean;
  all?: boolean;
  cue?: boolean;
  programId?: number;
  dealerCode?: string;
  distance?: string;
  handlerChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IDealers {
  items: IDealer[];
  error?: boolean;
  cue?: boolean;
  allChecked?: boolean;
  handlerChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IDealersParams {
  sourceId: string;
  make: string;
  model: string;
  year: string;
  zip: string;
  trim?: string;
  sessionId?: string;
  trackingId?: string;
}
