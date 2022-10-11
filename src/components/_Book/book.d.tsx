declare interface RecommendationBlock {
  ID: number;
  Name: string;
  Items: Array<Book>; // Ding: 我這邊有改成Array<> ，這邊看起來是都會回傳用array包起來的資料
}

declare interface Book {
  ID: number;
  Cover: string;
  Name: string;
}
