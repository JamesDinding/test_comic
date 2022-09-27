declare type User = {
  ID: number;
  token: string;
};

declare interface UserContextType {
  user: User;
  login: () => void;
  logout: () => void;
  bindPhone: () => void;
}
