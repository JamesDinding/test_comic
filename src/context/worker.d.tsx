declare type HttpStatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 500;

declare interface WorkerResponse {
  status: HttpStatusCode;
  msg: string;

  imageblob?: string;
  data?: any;
  blocks?: Array<RecommendationBlock>;
}

declare interface WorkerTask {
  action: string; // 執行方法
  data?: any;
}

declare interface WorkerContextType {
  send(msg: WorkerTask): Promise<WorkerResponse>;
}

// ----

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
