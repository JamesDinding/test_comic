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
  login: (account: string, password: string) => Promise<boolean>;
  logout: () => void;
  bindPhone: () => void;
  getUserStatus: () => void;
  getUserRecords: () => void;
}
