// declare interface RecommendationBlock {
//   ID: number;
//   Name: string;
//   Items: Array<Book>; // Ding: 我這邊有改成Array<> ，這邊看起來是都會回傳用array包起來的資料
// }

declare interface RecommendationBlock {
  banner?: Array<BlockContent>;
  吸睛首選?: Array<BlockContent>;
  新書強推?: Array<BlockContent>;
  本週更新?: Array<BlockContent>;
  "3D主打"?: Array<BlockContent>;
  熱門Cosplay?: Array<BlockContent>;
  私人收藏?: Array<BlockContent>;
}

declare interface BlockContent {
  id?: number;
  title?: string;
  creator?: string;
  description?: string;
  status?: string;
  covers?: {
    thumb: string;
    thumbx: string;
  };
}

// 直接全部+問號 extends其他的 有再去時間改
declare interface Book extends BlockContent {
  ID?: number;
  Cover?: string;
  Name?: string;
}
