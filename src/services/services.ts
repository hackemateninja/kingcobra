import { IModel } from '@/def/IModel';
import { config } from '@/util/config';
import { IMake } from '../definitions/IMake';

export const getMakes = async (): Promise<IMake[]> => {
  const response = await fetch(`${config.apiBaseUrl}/makes`);

  return response.json();
};

export const getModelsByMake = async (make: string | string[]): Promise<IModel[]> => {
  const response = await fetch(`${config.apiBaseUrl}/models/${make}`);

  return response.json();
};
