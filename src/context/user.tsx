import { h, FunctionalComponent, createContext } from "preact";
import { useState, useEffect, useContext } from "preact/hooks";
import { getUser } from "../lib/api";

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

  const loginHandler = (account: string, password: string) => {
    fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({ username: "test", password: "test" }),
    })
      .then((res) => {
        console.log(res);
        if (!res) throw new Error("failed");

        return res.json();
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("nsmh_log_status", "true");
        setIsLogIn(true);
      })
      .catch((err) => {
        console.log(err.message || "error happened");
      });
  };

  const logoutHandler = () => {
    setToken("");
    setIsLogIn(false);
  };

  const getUserStatusHandler = async () => {
    const { data } = await getUser();
    setCoins(data?.coins || 0);
    setVip(data?.vip_time || null);
  };

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
