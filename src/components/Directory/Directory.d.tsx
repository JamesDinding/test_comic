declare type ChapterData = {
  covers: {
    thumb: string;
    thumbx: string;
  };
  id: string;
  status: boolean;
  price: number;
  position: number;
  bookId?: string;
};

declare type ChapterItem = {
  chapter: ChapterData;
  smallSize?: boolean;
  bookId?: string;
  routeReplace?: boolean;
};

declare interface ChapterList {
  chapterList: Array<ChapterData>;
  bookId?: string;
}

declare interface Content {
  id: string;
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
