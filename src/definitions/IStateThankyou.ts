import { IModel } from "@/def/IModel";
import { IMake } from "@/def/IMake";

interface IZipCode {
  city?: string;
  state?: string;
  zip?: string;
  loading?: boolean;
}

interface IDataThankyou {
  make: IMake;
  model: IModel;
  zipcode: IZipCode;
}

interface IUIThankyou {
  buttonClick: boolean;
}

export interface IStateThankyou {
  data: IDataThankyou;
  ui: IUIThankyou;
}
