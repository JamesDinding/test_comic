declare type User = {
  ID: number;
  userName: string;
  password: string;
  token: string; // do nothing
};

declare type UserStatus = {
  coins: number;
  vip: string | null;
  status: string;
};

declare interface UserContextType {
  isLogIn: boolean;
  user: User;
  userStatus: UserStatus;
  setLogin: () => void;
  login: (account: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  bindPhone: () => void;
  updateCoins: (cost: number) => void;
  getUserStatus: () => Promise<void>;
  getUserRecords: () => void;
}
