import { h, FunctionalComponent, createContext } from "preact";
import { useState, useEffect, useContext } from "preact/hooks";

const DomainContext = createContext({
  srcDomain: "",
});

export const DomainProvider: FunctionalComponent = ({ children }) => {
  const [srcDomain, setSrcDomain] = useState("");

  useEffect(() => {
    fetch("/api/v1/domains?type=src")
      .then(async (res) => {
        if (!res.ok) throw new Error("failed to fetch");
        const { domains } = await res.json();
        setSrcDomain(domains.src[0]);
      })
      .catch((err) => {
        console.log(err.message || "Something wrong!");
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
