declare type ChapterData = {
  cover: string;
  episode: number;
  isLocked: boolean;
};

declare type ChapterItem = {
  chapter: ChapterData;
  smallSize?: boolean;
};

declare interface ChapterList {
  chapterList: Array<ChapterData>;
}
