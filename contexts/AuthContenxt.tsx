import { createContext, ReactNode } from "react";

type Credentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: Credentials) => Promise<void>;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const isAuthenticated = false;
  const signIn = async ({ password, email }: Credentials) => {
    console.log({ email, password });
  };

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
