declare type RequestState = {
  status: string | null;
  data: any | null;
  error: any | null;
};

declare type RequestAction = {
  type: "SEND" | "SUCCESS" | "ERROR";
  responseData?: any | null;
  errorMessage?: string;
};
