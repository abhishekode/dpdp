"use client";
import { getCookie } from "cookies-next";
import React, { useEffect, createContext, useState, useContext } from "react";

export interface IUser {
  createdAt: string;
  email: string;
  name: string;
  phone: string;
  profile: string;
  role: "student" | "admin";
  token: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

interface UserContextProps {
  user?: IUser;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const UserContext = createContext<UserContextProps>({
  user: undefined,
  setUser: () => {},
});

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser>(() => {
    const cookies = getCookie("user");
    return cookies ? JSON.parse(cookies) : undefined;
  });

  useEffect(() => {
    const cookies = getCookie("user");
    if (cookies) {
      setUser(JSON.parse(cookies));
    }
  }, []);

  const contextValue: UserContextProps = { user, setUser };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useGlobalUser = () => {
  return useContext(UserContext);
};
