declare type ChapterData = {
  covers: {
    thumb: string;
    thumbx: string;
  };
  id: number;
  status: boolean;
  price: number;
  position: number;
  bookId?: number;
};

declare type ChapterItem = {
  chapter: ChapterData;
  smallSize?: boolean;
  bookId?: number;
  routeReplace?: boolean;
};

declare interface ChapterList {
  chapterList: Array<ChapterData>;
  bookId?: string;
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
  bookmark_status: boolean;
  hot: string;
  views: string;
  chapter: Array<ChapterData>;
}
