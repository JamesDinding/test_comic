declare type User = {
  ID: number;
  token: string;
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
  login: (account: string, password: string) => Promise<any>;
  logout: () => void;
  bindPhone: () => void;
  updateCoins: (cost: number) => void;
  getUserStatus: () => Promise<void>;
  getUserRecords: () => void;
}
