declare interface ModalContextType {
  isPop: boolean;
  close: () => void;
  pop: (title?: string, msg?: string) => void;
  callback?: ([...arg]?: any) => void;
}
