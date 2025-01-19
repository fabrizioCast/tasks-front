import { z } from "zod";
import { TaskStatus } from "../interface/Task";

export const TaskFormSchema = z.object({
  title: z.string().nonempty("El título es obligatorio"),
  description: z.string().optional(),
  status: z.enum([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED]),
});

export type TaskForm = z.infer<typeof TaskFormSchema>;
