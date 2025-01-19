import { createContext, useContext, useState } from "react";
import { UserProps } from "../interface/User";
import { AuthService } from "../modules/Auth/services/Auth.service";
import { ToastAndroid } from "react-native";
import { updateTokenAxios } from "../config/axios.config";

interface AuthContextProps {
  user: UserProps | null;
  isAuth: boolean;
  isLoading: boolean;
  login: (user: Partial<UserProps>) => Promise<void>;
  logout: () => void;
  register: (user: Partial<UserProps>) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => useContext(AuthContext) as AuthContextProps;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (user: Partial<UserProps>) => {
    try {
      setIsLoading(true);

      const userInfo = await AuthService.login(user);

      putCredentials(userInfo);
      setUser(userInfo);
    } catch (error) {
      console.log("error: 1", error);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (user: Partial<UserProps>) => {
    try {
      setIsLoading(true);

      const userInfo = await AuthService.register(user);

      putCredentials(userInfo);
      setUser(userInfo);
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const putCredentials = async (user: UserProps) => {
    updateTokenAxios(user?.access_token || "");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuth: !!user, isLoading, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
