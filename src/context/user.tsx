import { h, FunctionalComponent, createContext } from "preact";
import { useState, useEffect, useContext, useCallback } from "preact/hooks";
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
  const [status, setStatus] = useState("");

  function resetUserInfo() {
    setID(0);
    setCoins(0);
    setVip("");
  }

  const loginHandler = useCallback(
    async (account: string, password: string) => {
      try {
        const data = await apiLogin(account, password);

        if (!data.error) {
          console.log("no error happen when login");
          localStorage.setItem("nsmh_log_status", "true");
          setIsLogIn(true);
        }
        console.log(data.error);

        return data;
      } catch (err: any) {
        console.error(err.message || "login failed");
        return err.message;
      }
    },
    [setIsLogIn, apiLogin]
  );

  const logoutHandler = useCallback(async () => {
    try {
      const isError = await apiLogout();

      if (!isError) {
        localStorage.removeItem("nsmh_log_status");
        setToken("");
        resetUserInfo();
        setIsLogIn(false);
      }
    } catch (err: any) {
      console.error("logout gogo");
      localStorage.removeItem("nsmh_log_status");
      setToken("");
      resetUserInfo();
      setIsLogIn(false);
    } finally {
      localStorage.removeItem("nsmh_log_status");
      setToken("");
      resetUserInfo();
      setIsLogIn(false);
    }
  }, [setToken, setIsLogIn, apiLogout]);

  const getUserStatusHandler = useCallback(async () => {
    const { data } = await getProfile();
    setID(data?.uid || 0);
    setCoins(data?.coins || 0);
    setVip(data?.vip_time || null);
    setStatus(data?.status || "");
  }, []);

  const updateCoinsHandler = useCallback((cost: number) => {
    setCoins((prev) => prev - cost);
  }, []);

  useEffect(() => {
    if (!isLogIn) {
      localStorage.removeItem("nsmh_log_status");
      setToken("");
      resetUserInfo();
      setIsLogIn(false);
      return;
    }
    try {
      getUserStatusHandler();
    } catch (err: any) {
      // console.error(err.message || "Cant get user profile.");
    }
  }, [isLogIn]);

  const value = {
    isLogIn,
    user: { ID, token },
    userStatus: { coins, vip, status },
    login: loginHandler,
    logout: logoutHandler,
    bindPhone: () => {},
    updateCoins: updateCoinsHandler,
    getUserStatus: getUserStatusHandler,
    getUserRecords: () => {},
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUser() {
  return useContext(UserContext);
}
