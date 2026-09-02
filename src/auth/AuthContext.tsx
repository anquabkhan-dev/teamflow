import { createContext, useContext, useEffect, useState } from "react";
import { hasPermission } from "./Permissions";
import api from "../api/axios";

type User = {
  id: string;
  name: String;
  role: "manager" | "admin" | "developer";
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      return JSON.parse(userDetails);
    }
    return null
  })

  const login = async (email: string, password: string) => {

    const resp = await api.post("/login", {
      email,  
      password,
    })

    const {accessToken, refreshToken, user} = resp.data

    localStorage.setItem("userDetails", JSON.stringify(user))
    localStorage.setItem("access_token", accessToken)
    localStorage.setItem("refresh_token",refreshToken)

    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("access_token")
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user ? true : false,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
