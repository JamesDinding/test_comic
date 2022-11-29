import { h, FunctionalComponent, createContext } from "preact";
import { route } from "preact-router";
import {
  useState,
  useRef,
  useContext,
  useCallback,
  useEffect,
} from "preact/hooks";
import { checkAuth } from "../lib/api";

/**
 * tempData structure
 *  {
 *    SearchPage: { content: Book[],
 *                  searchWord: string
 *                },
 *    CategoryPage: { category_id: { content: Book[],
 *                                   scroll_height: number,
 *                                   container_height: number }
 *                  }
 *    HomePage: {
 *                content: Book[],
 *                scroll_height: number,
 *                container_height: number,
 *              }
 *  }
 */

const RouterContext = createContext<RouterContextType>(null!);

export const RouterProvider: FunctionalComponent = ({ children }) => {
  const stackRef = useRef<string[]>([]);
  const [routerStack, setRouterStack] = useState([window.location.pathname]);
  const currentUrlRef = useRef(window.location.pathname || "");
  const [attachment, setaAttachment] = useState(null);
  const [tc, setTc] = useState("");
  const [tempData, setTempData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLegit, setIsLegit] = useState(false);
  const [isUc, setIsUc] = useState(
    navigator.userAgent.toLowerCase().includes("ucbrowser")
  );

  useEffect(() => {
    checkAuth()
      .then((response) => {
        console.log(response);
        setIsLegit(true);
      })
      .catch((err) => {
        if (err.status === 401) setIsLegit(false);
      });
  }, [currentUrlRef.current]);

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

  const attachDataHandler = useCallback((d: any) => {
    setaAttachment(d);
  }, []);

  const setTempHandler = useCallback((d: any) => {
    setTempData(d);
  }, []);

  const settingTcHandler = useCallback(
    (tcString: string) => setTc(tcString),
    []
  );

  useEffect(() => {
    window.onpopstate = (e) => {
      const target = e.target as Window;
      console.log("current url", currentUrlRef.current);
      console.log("stack", routerStack);
      console.log("stack的前一頁", routerStack[routerStack.length - 2]);
      console.log("目標網址", target.location.pathname);
      const stack_len = routerStack.length;
      if (
        stack_len > 1 &&
        target.location.pathname === routerStack[routerStack.length - 2]
      ) {
        console.log("previous page");
        const des = popHandler();
        if (des === "/") route("/home");

        if (isUc) {
          route(des);
        }
      } else {
        pushHandler(target.location.pathname);
      }
    };
  }, [popHandler]);

  const value = {
    isLegit,
    isUc,
    currentRoute: currentUrlRef.current,
    customRouter: {
      routerStack,
      pop: popHandler,
      push: pushHandler,
    },
    tc,
    settingTc: settingTcHandler,
    attachment,
    attachData: attachDataHandler,
    tempData,
    setTempData: setTempHandler,
    cleanTempData: () => setTempData(null),
    isLoading,
    popLoading: () => setIsLoading(true),
    shutLoading: () => setIsLoading(false),
  };

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
};

export function useRouter() {
  return useContext(RouterContext);
}
