import { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";
import Router from "next/router";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type Credentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: Credentials) => Promise<void>;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>(null);
  const isAuthenticated = !!user;

  const signIn = async ({ password, email }: Credentials) => {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      const { permissions, roles } = response.data;

      setUser({ email, permissions, roles });

      Router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};