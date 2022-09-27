import { h, FunctionalComponent, createContext } from "preact";
import { useState, useEffect, useContext } from "preact/hooks";

const UserContext = createContext<UserContextType>(null!);

export const UserProvider: FunctionalComponent = ({ children }) => {
  const [ID, setID] = useState<number>(null!);
  const [token, setToken] = useState<string>("");

  const loginHandler = () => {
    setToken("");
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
