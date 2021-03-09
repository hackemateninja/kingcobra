export interface IPostLeadParams {
  customer: {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    email: string;
    zip: string;
    city: string;
    state: string;
  };
  vehicle: {
    make: string;
    model: string;
    year: number;
  };
  sourceId: string;
  selectedDealers: ISelectedDealers[];
  device?: "Unknown" | "Mobile" | "Tablet" | "Desktop";
  tracking?: string;
  transactionId?: string;
  sessionId?: string;
}

export interface ISelectedDealers {
  programId: number;
  dealerId: string;
  dealerCode: string;
  distance: string;
}
