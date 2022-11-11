import { h, FunctionalComponent, createContext } from "preact";
import { useState, useEffect, useContext, useCallback } from "preact/hooks";

const RouterContext = createContext<RouterContextType>(null!);

export const RouterProvider: FunctionalComponent = ({ children }) => {
  const [currentUrl, setCurrentUrl] = useState(window.location.pathname || "");
  const [routerStack, setRouterStack] = useState([window.location.pathname]);

  const popHandler = useCallback(() => {
    const temp = [...routerStack];
    const popResult = temp.pop();

    if (!popResult) return "";

    setRouterStack(temp);
    setCurrentUrl(popResult);
    return popResult;
  }, [routerStack]);

  const pushHandler = useCallback(
    (url: string, replace?: boolean) => {
      const temp = [...routerStack];
      setCurrentUrl(url);

      if (replace) {
        temp.pop();
        temp.push(url);
        setRouterStack(temp);
      } else {
        temp.push(url);
        setRouterStack(temp);
      }
    },
    [routerStack]
  );

  const value = {
    currentRoute: currentUrl,
    customRouter: {
      routerStack,
      pop: popHandler,
      push: pushHandler,
    },
  };

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
};

export function useRouter() {
  return useContext(RouterContext);
}
