import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z.string().nonempty("El usuario es requerido"),
  password: z.string().nonempty("La contraseña es requerida"),
});

export type LoginForm = z.infer<typeof LoginFormSchema>;
