import { createContext, useState } from "react";
import storage from "../utils/storage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    token: null,
  });

  const login = (token) => {
    storage.add("token", token);
    setAuth((prevState) => ({
      ...prevState,
      isLoggedIn: true,
      token,
    }));
  };

  const logout = () => {
    storage.clear();
    setAuth((prevState) => ({
      ...prevState,
      isLoggedIn: false,
      token: null,
    }));
  };

  const authenticate = (token) => {
    setAuth((prevState) => ({
      ...prevState,
      isLoggedIn: true,
      token,
    }));
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
