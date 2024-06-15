"use client";
import React, { createContext, useContext, useState } from "react";

const AuthDataContext = createContext();

export const useAuthData = () => useContext(AuthDataContext);

export const AuthDataProvider = ({ children }) => {
  const [authData, setAuthData] = useState("Hello");

  const login = (email) => {
    setAuthData(email); // Assuming you're setting the authData with an object containing email
  };

  // const logout = () => {
  //   setAuthData(null);
  // };

  return (
    <AuthDataContext.Provider value={{ authData, login }}>{children}</AuthDataContext.Provider>
  );
};
