import { IQuote } from '@/def/IQuotes';

interface IUIStepOne {
  modal: boolean;
  modalType: string;
  buttonLoading: boolean;
}

export interface IStateSite {
  month: string;
  year: number;
  quotes: IQuote[];
  ui: IUIStepOne;
}
