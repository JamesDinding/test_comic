interface ReadingContextType {
  isPopControl: boolean;
  isPopChapter: boolean;
  isPopBuy: boolean;
  popControl: () => void;
  popChapter: () => void;
  popBuy: () => void;
  reset: () => void;
}

interface ReadingState {
  isPopControl: boolean;
  isPopChapter: boolean;
  isPopBuy: boolean;
}

type ReadingActionType = "onControl" | "onChapter" | "onBuy" | "reset";

interface ReadingReducerAction {
  type: ReadingActionType;
}
