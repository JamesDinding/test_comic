declare interface RecommendationBlock {
  banner?: Array<BlockContent>;
  吸精首选?: Array<BlockContent>;
  新书强推?: Array<BlockContent>;
  本周更新?: Array<BlockContent>;
  "3D主打"?: Array<BlockContent>;
  热门cosplay?: Array<BlockContent>;
  私人收藏?: Array<BlockContent>;
}

declare interface BlockContent {
  id?: string;
  title?: string;
  creator?: string;
  description?: string;
  status?: "连载" | "完结";
  hot?: string;
  views?: string;
  covers?: {
    thumb: string;
    thumbx: string;
  };
}

// 直接全部+问号 extends其他的 有再去时间改
declare interface Book extends BlockContent {
  ID?: string;
  Cover?: string;
  Name?: string;
  source?: string;
  bookmark_status?: boolean;
}
