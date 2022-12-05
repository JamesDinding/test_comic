import { h, FunctionalComponent, createContext } from "preact";
import { route } from "preact-router";
import {
  useState,
  useRef,
  useContext,
  useCallback,
  useEffect,
} from "preact/hooks";

const RouterContext = createContext<RouterContextType>(null!);

export const RouterProvider: FunctionalComponent = ({ children }) => {
  const [routerStack, setRouterStack] = useState([window.location.pathname]);
  const currentUrlRef = useRef(window.location.pathname || "");
  const [attachment, setaAttachment] = useState(null);
  const [tc, setTc] = useState("");
  const [tempData, setTempData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLegit, setIsLegit] = useState(true);
  const [isUc, setIsUc] = useState(
    navigator.userAgent.toLowerCase().includes("ucbrowser")
  );
  const ucQueueRef = useRef<string[]>([]);
  const [ucQ, setUcQ] = useState<string[]>([]);
  const isBusyRef = useRef(false);

  // test
  useEffect(() => {
    const q_len = ucQ.length;

    if (q_len === 0 || isBusyRef.current) return;
    let timer: any;
    const q_promise = new Promise((resolve) => {
      let counter = 0;
      // timer = setInterval(() => {
      timer = setTimeout(() => {
        // if (location.pathname !== ucQ[q_len - 1]) {
        counter++;
        history.pushState({ isPush: true }, "", ucQ[q_len - 1]);
        // } else {
        setTempData("resolve pop");
        resolve("pop");
        // }
      }, 1000);
    });

    isBusyRef.current = true;
    q_promise.then((res) => {
      // clearInterval(timer);
      isBusyRef.current = false;
      setTempData("pop");
      setUcQ((prev) => {
        const temp = [...prev];
        temp.pop();
        return temp;
      });
    });
  }, [ucQ, isBusyRef.current]);

  // check user valid when url changed
  useEffect(() => {
    fetch("/api/v1/auth/check")
      .then((response) => {
        if (response.status === 401) {
          setIsLegit(false);
          throw new Error("not logged");
        }
        if (response.status === 403) setIsLegit(true);
      })
      .catch((err) => {});
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
    if (isUc) {
      window.onpopstate = (e) => {
        const des = popHandler();
        route(des);
      };
    } else {
      window.onpopstate = (e) => {
        const target = e.target as Window;
        const stack_len = routerStack.length;

        if (
          stack_len > 1 &&
          target.location.pathname === routerStack[routerStack.length - 2]
        ) {
          const des = popHandler();
          if (des === "/") route("/home");
        } else {
          pushHandler(target.location.pathname);
        }
      };
    }
  }, [popHandler]);

  const value = {
    isLegit,
    setLegit: (arg: boolean) => setIsLegit(arg),
    isUc,
    ucQueue: ucQueueRef.current,
    ucQ,
    pushUcQ: (arg: string) => {
      setUcQ((prev) => {
        const temp = [...prev];
        temp.unshift(arg);
        return temp;
      });
    },
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
