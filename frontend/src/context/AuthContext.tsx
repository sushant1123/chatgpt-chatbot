import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  signinUserFn: (email: string, password: string) => Promise<void>;
  signupUserFn: (name: string, email: string, password: string) => Promise<void>;
  logoutUserFn: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const signinUserFn = async (email: string, password: string) => {
    try {
      console.log({ email, password });
    } catch (error) {
      console.log("Error signing in user: ", error);
    }
  };

  const signupUserFn = async (name: string, email: string, password: string) => {
    try {
      console.log({ name, email, password });
    } catch (error) {
      console.log("Error signing up user: ", error);
    }
  };

  const logoutUserFn = async () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // check if user cookies are valid or not
    // if valid, set isLoggedIn to true and setUser with user data
    // if not valid, set isLoggedIn to false and setUser to null
  }, []);

  const authProviderValue = {
    isLoggedIn,
    user,
    signinUserFn,
    signupUserFn,
    logoutUserFn,
  };

  return <AuthContext.Provider value={authProviderValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
