import { h, FunctionalComponent, createContext } from "preact";
import { useState, useEffect, useContext, StateUpdater } from "preact/hooks";

const DomainContext = createContext({
  srcDomain: "",
  setDomain: (src: string) => {},
});

export const DomainProvider: FunctionalComponent = ({ children }) => {
  const [srcDomain, setSrcDomain] = useState("");

  const value = {
    srcDomain: srcDomain,
    setDomain: (src: string) => {
      setSrcDomain(src);
    },
  };

  return (
    <DomainContext.Provider value={value}>{children}</DomainContext.Provider>
  );
};

export function useDomain() {
  return useContext(DomainContext);
}
