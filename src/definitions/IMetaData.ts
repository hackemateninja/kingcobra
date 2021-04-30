export interface IMetaData {
  title: string;
  description?: string;
  keywords?: string;
  preload?: IPreload[];
}

export interface IPreload {
  elem: string;
  type: string;
}
