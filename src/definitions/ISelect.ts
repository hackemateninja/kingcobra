import { IMake } from './IMake';
import { IModel } from './IModel';

export interface ISelect {
  id: string;
  name: string;
  label: string;
  cue: boolean;
  error: boolean;
  message: string;
  options?: (IMake | IModel)[];
  initialValue?: string;
  handlerChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
