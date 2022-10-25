import {
  useContext,
  useEffect,
  useRef,
  MutableRef,
  useState,
  StateUpdater,
} from "preact/hooks";
import { h, createContext, FunctionComponent } from "preact";

// 建立上下文
const ObserverContext = createContext<ObserverContextType>(null!);

export const ObserverProvider: FunctionComponent<ObserverProviderProps> = ({
  rootElement,
  children,
}) => {
  const refStorage: Map<any, StateUpdater<boolean>> = new Map();

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          observer.unobserve(e.target);
          console.log(e.target);
          refStorage.get(e.target)?.(true);
        }
      });
    },
    {
      root: rootElement.current,
      rootMargin: "-150px 5000px 0px 0px",
    }
  );

  const observe = () => {
    let r = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
      if (r?.current) {
        observer.observe(r.current);
        refStorage.set(r.current, setInView);
      }
    }, [r, inView]);

    return { ref: r, isShown: inView };
  };

  return (
    <ObserverContext.Provider value={{ observe }}>
      {children}
    </ObserverContext.Provider>
  );
};

export function useObserver(): ObserverContextType {
  return useContext<ObserverContextType>(ObserverContext);
}

interface ObserverContextType {
  observe(): ObserverTarget;
}

interface ObserverTarget {
  ref: MutableRef<any>;
  isShown: boolean;
}

interface ObserverProviderProps {
  rootElement: MutableRef<any>;
}
