import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("happyamy2016");

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
