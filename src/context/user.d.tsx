declare type User = {
  ID: number;
  token: string;
};

declare type UserStatus = {
  coins: number;
  vip: string | null;
};
declare interface UserContextType {
  isLogIn: boolean;
  user: User;
  userStatus: UserStatus;
  login: (account: string, password: string) => void;
  logout: () => void;
  bindPhone: () => void;
  getUserStatus: () => void;
  getUserRecords: () => void;
}
