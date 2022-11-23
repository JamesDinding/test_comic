// declare interface RecommendationBlock {
//   ID: number;
//   Name: string;
//   Items: Array<Book>; // Ding: 我这边有改成Array<> ，这边看起来是都会回传用array包起来的资料
// }

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
  id?: number | string;
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
  ID?: number | string;
  Cover?: string;
  Name?: string;
  bookmark_status?: boolean;
}
