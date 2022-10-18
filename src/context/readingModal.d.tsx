import { StateUpdater } from "preact/hooks";

type Stuff = {comic_id:number, price:number}

interface ReadingContextType {
  isPopControl: boolean;
  isPopChapter: boolean;
  isPopBuy: boolean;
  stuffInfo:Stuff;
  setStuffInfo: StateUpdater<Stuff>;
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
