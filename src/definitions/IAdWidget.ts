export interface IAdWidget {
  title?: string;
  make: string;
  model: string;
  zip: string;
  category: string;
  implement: string;
  utss: string;
  onClick?: (event: React.MouseEvent) => void;
}
