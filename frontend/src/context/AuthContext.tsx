import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginUser, logoutUser, signupUser } from "../helpers/api-helpers";

type User = {
  name: string;
  email: string;
  id: string;
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
    const respData = await loginUser(email, password);

    if (respData.status === "Success") {
      const data2 = respData.data;
      setUser({ email: data2?.email, name: data2?.name, id: data2?._id });
      setIsLoggedIn(true);
    }
  };

  const signupUserFn = async (name: string, email: string, password: string) => {
    const respData = await signupUser(name, email, password);
    if (respData.status === "Success") {
      const data2 = respData.data;
      setUser({ email: data2?.email, name: data2?.name, id: data2?._id });
      setIsLoggedIn(true);
    }
  };

  const logoutUserFn = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setUser(null);

    window.location.reload();
  };

  useEffect(() => {
    const checkStatus = async () => {
      const respData = await checkAuthStatus();

      if (respData.status === "Success") {
        const data2 = respData.data;
        setUser({ email: data2?.email, name: data2?.name, id: data2?._id });
        setIsLoggedIn(true);
      }
    };

    checkStatus();
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
