import { axiosInstance } from "@/src/config/axios.config";
import { UserProps } from "@/src/interface/User";

export class AuthService {
  static async login(user: Partial<UserProps>): Promise<UserProps> {
    try {
      if (!user.username || !user.password) {
        throw new Error("El usuario y la contraseña son requeridos");
      }

      const res = await axiosInstance.post("/auth/login", user);

      if (res.status !== 201) {
        throw new Error(res.data.message);
      }

      return res.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }

  static async register(user: Partial<UserProps>): Promise<UserProps> {
    try {
      if (!user.username || !user.password) {
        throw new Error("El usuario y la contraseña son requeridos");
      }

      const res = await axiosInstance.post("/users/register", user);

      if (res.status !== 201) {
        throw new Error(res.data.message);
      }

      return res.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
}
