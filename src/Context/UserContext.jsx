import { createContext, useEffect } from "react";
import { useState } from "react";
import { getUser } from "../utils/users_api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [userObj, setUserObj] = useState({});

  useEffect(() => {
    getUser(user).then((res) => {
      setUserObj(res);
    });
  }, [user]);

  if (!userObj)
    return (
      <UserContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        {children}
      </UserContext.Provider>
    );

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userFriendlyName: userObj.name,
        userImg: userObj.avatar_url,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
