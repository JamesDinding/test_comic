import { h, FunctionalComponent, createContext } from "preact";
import { useState, useEffect, useContext } from "preact/hooks";
import { getProfile, logout as apiLogout, login as apiLogin } from "../lib/api";

const UserContext = createContext<UserContextType>(null!);

export const UserProvider: FunctionalComponent = ({ children }) => {
  let initialLogInStatus =
    localStorage.getItem("nsmh_log_status") === "true" ? true : false;
  const [isLogIn, setIsLogIn] = useState(initialLogInStatus);
  // User
  const [ID, setID] = useState<number>(null!);
  const [token, setToken] = useState<string>("");
  // UserStatus
  const [coins, setCoins] = useState<number>(null!);
  const [vip, setVip] = useState<string | null>(null);

  async function loginHandler(account: string, password: string) {
    try {
      const data = await apiLogin(account, password);

      if (!data.error) {
        localStorage.setItem("nsmh_log_status", "true");
        setIsLogIn(true);
      }

      // 應該是要return data.message
      return !!data;
    } catch (err: any) {
      console.error(err.message || "login failed");
      return false;
    }
  }

  async function logoutHandler() {
    try {
      const isError = await apiLogout();

      if (!isError) {
        localStorage.removeItem("nsmh_log_status");
        setToken("");
        setIsLogIn(false);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  }

  async function getUserStatusHandler() {
    const { data } = await getProfile();
    setCoins(data?.coins || 0);
    setVip(data?.vip_time || null);
  }

  const value = {
    isLogIn,
    user: { ID, token },
    userStatus: { coins, vip },
    login: loginHandler,
    logout: logoutHandler,
    bindPhone: () => {},
    getUserStatus: getUserStatusHandler,
    getUserRecords: () => {},
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUser() {
  return useContext(UserContext);
}
