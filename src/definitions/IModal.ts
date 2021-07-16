export interface IModal {
  isActive: boolean;
  modalType: string;
  onOpenModal?: (modalType: string) => void;
  handlerClose?: (event: React.MouseEvent<HTMLDivElement>) => void;
}
