export interface IButton {
  isDisabled?: boolean;
  type?: string;
  handlerClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
