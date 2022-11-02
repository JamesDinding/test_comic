import { h, FunctionalComponent, createContext } from "preact";
import { useContext, useState } from "preact/hooks";

const ModalContext = createContext<ModalContextType>(null!);

export const ModalProvider: FunctionalComponent = ({ children }) => {
  const [isPop, setIsPop] = useState(false);

  const pop = (windowName?: string) => setIsPop(true);
  const close = () => setIsPop(false);

  const value = { isPop, pop, close };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export function useNotifyModal() {
  return useContext(ModalContext);
}
