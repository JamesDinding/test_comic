declare type ChapterData = {
  covers: {
    thumb: string;
    thumbx: string;
  };
  id: number;
  status: boolean;
  price: number;
  position: number;
  
};

declare type ChapterItem = {
  chapter: ChapterData;
  smallSize?: boolean;
  bookId?:number;
};

declare interface ChapterList {
  chapterList: Array<ChapterData>;
  bookId?:number;
}

declare interface Content {
  id: number;
  creator: string;
  title: string;
  description: string;
  status: string;
  covers: {
    thumb: string;
    thumbx: string;
  };
  chapter: Array<ChapterData>;
}
