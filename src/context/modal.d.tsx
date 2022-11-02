declare interface ModalContextType {
  isPop: boolean;
  close: () => void;
  pop: (windowName?: string) => void;
  callback?: ([...arg]?: any) => void;
}
