import { h, FunctionalComponent, createContext } from "preact";
import { useState, useEffect, useContext } from "preact/hooks";

const DomainContext = createContext({
  srcDomain: "",
});

export const DomainProvider: FunctionalComponent = ({ children }) => {
  const [srcDomain, setSrcDomain] = useState("");

  useEffect(() => {
    fetch("/api/keyv1/domains?type=RESOURCE")
      .then(async (res) => {
        if (!res.ok) throw new Error("failed to fetch");
        const { data } = await res.json();
        setSrcDomain(data.RESOURCE[0]);
      })
      .catch((err) => {
        console.error(err.message || "Something wrong!");
      });
  }, []);

  const value = {
    srcDomain,
  };

  return (
    <DomainContext.Provider value={value}>{children}</DomainContext.Provider>
  );
};

export function useDomain() {
  return useContext(DomainContext);
}
