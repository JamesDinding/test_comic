
declare type Stuff = {
  comic_id:number;
  price:number;
}

declare interface ReadingContextType {
  isPopControl: boolean;
  isPopChapter: boolean;
  isPopBuy: boolean;
  stuffInfo?: ChapterData;
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
