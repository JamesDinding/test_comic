import { h, FunctionalComponent, createContext } from "preact";
import { useState, useRef, useContext, useCallback } from "preact/hooks";

const RouterContext = createContext<RouterContextType>(null!);

export const RouterProvider: FunctionalComponent = ({ children }) => {
  const [routerStack, setRouterStack] = useState([window.location.pathname]);
  const currentUrlRef = useRef(window.location.pathname || "");

  // pop the lastest history and return current lastest history
  const popHandler = useCallback(() => {
    const temp = [...routerStack];
    const popResult = temp.pop();
    if (!popResult) return "/";
    setRouterStack([...temp]);
    const cur = temp.pop() || "/";
    currentUrlRef.current = cur;
    return cur;
  }, [routerStack, currentUrlRef.current]);

  const pushHandler = useCallback(
    (url: string, replace?: boolean) => {
      const temp = [...routerStack];
      currentUrlRef.current = url;
      if (replace) {
        temp.pop();
        temp.push(url);
        setRouterStack(temp);
      } else {
        temp.push(url);
        setRouterStack(temp);
      }
    },
    [routerStack, currentUrlRef.current]
  );

  const value = {
    currentRoute: currentUrlRef.current,
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
