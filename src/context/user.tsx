import { h, FunctionalComponent, createContext } from "preact";
import { useState, useEffect, useContext } from "preact/hooks";

const UserContext = createContext<UserContextType>(null!);

export const UserProvider: FunctionalComponent = ({ children }) => {
  const [ID, setID] = useState<number>(null!);
  const [token, setToken] = useState<string>("");

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
      });
  };

  const logoutHandler = () => {
    setToken("");
  };

  const value = {
    user: { ID, token },
    login: loginHandler,
    logout: logoutHandler,
    bindPhone: () => {},
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUser() {
  return useContext(UserContext);
}
