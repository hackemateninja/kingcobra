export interface IButton {
  disabled?: boolean;
  type?: string;
  loading?: boolean;
  handlerClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
