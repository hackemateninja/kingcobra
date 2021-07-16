export interface IMldDealer {
  dealerID: string;
  name: string;
  dealerCode: string;
  address: string;
  city: string;
  distance: string;
  programID: number;
  state: string;
  zipCode: string;
}

export interface IMldDealersResponse {
  coverage?: boolean;
  dealers?: IMldDealer[];
  errors?: [];
  transactionID?: string;
}

export interface IMldLeadResponse {
  accepted: boolean;
  dealers: IMldDealer[];
  errors: [];
  transactionID: string;
  leadID: string;
}
