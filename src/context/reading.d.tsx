
declare interface Stuff extends ChapterData {
  bookId?:number;
}

declare interface ReadingContextType {
  isPopControl: boolean;
  isPopChapter: boolean;
  isPopBuy: boolean;
  stuffInfo?: Stuff;
  setStuffInfo: any;
  popControl: () => void;
  popChapter: () => void;
  popBuy: () => void;
  reset: () => void;
}

declare interface ReadingState {
  isPopControl: boolean;
  isPopChapter: boolean;
  isPopBuy: boolean;
}

type ReadingActionType = "onControl" | "onChapter" | "onBuy" | "reset";

declare interface ReadingReducerAction {
  type: ReadingActionType;
}
