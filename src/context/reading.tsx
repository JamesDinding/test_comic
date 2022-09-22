import { h, FunctionalComponent, createContext } from "preact";
import { useReducer, useEffect, useContext } from "preact/hooks";

const ReadingContext = createContext<ReadingContextType>(null!);

const ReadingReducer = (state: ReadingState, action: ReadingReducerAction) => {
  switch (action.type) {
    case "onControl":
      return { isPopControl: true, isPopChapter: false, isPopBuy: false };
    case "onChapter":
      return { isPopControl: false, isPopChapter: true, isPopBuy: false };
    case "onBuy":
      return { isPopControl: false, isPopChapter: false, isPopBuy: true };
    case "reset":
      return { isPopControl: false, isPopChapter: false, isPopBuy: false };

    default:
      return state;
  }
};

export const ReadingProvider: FunctionalComponent = ({ children }) => {
  const [state, dispatch] = useReducer(ReadingReducer, {
    isPopControl: false,
    isPopChapter: false,
    isPopBuy: false,
  });

  const popControlHandler = () => dispatch({ type: "onControl" });
  const popChapterHandler = () => dispatch({ type: "onChapter" });
  const popBuyHandler = () => dispatch({ type: "onBuy" });
  const resetHandler = () => dispatch({ type: "reset" });

  const value = {
    ...state,
    popControl: popControlHandler,
    popChapter: popChapterHandler,
    popBuy: popBuyHandler,
    reset: resetHandler,
  };
  return (
    <ReadingContext.Provider value={value}>{children}</ReadingContext.Provider>
  );
};

export function useReadingModal() {
  return useContext(ReadingContext);
}
