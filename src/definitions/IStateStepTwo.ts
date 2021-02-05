import { IDealer } from "@/def/IDealers";

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
}

interface IUIStepTwo {
  button: string;
  boxActive: "dealers" | "form";
  loading: "idle" | "pending" | "succeeded" | "failed";
}

export interface IStateStepTwo {
  data: IDataStepTwo;
  ui: IUIStepTwo;
}
