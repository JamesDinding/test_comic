declare type User = {
  ID: number;
  token: string;
};

declare interface UserContextType {
  user: User;
  login: (account: string, password: string) => void;
  logout: () => void;
  bindPhone: () => void;
}
