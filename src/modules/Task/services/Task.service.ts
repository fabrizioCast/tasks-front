import { axiosInstance } from "@/src/config/axios.config";
import { TaskProps, TaskStatus } from "../interface/Task";

export class TaskService {
  static async getTasks() {
    try {
      const response = await axiosInstance.get<TaskProps[]>("/tasks");
      console.log("TaskService ~ response:", response);

      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }

  static async createTask(task: Partial<TaskProps>) {
    try {
      const response = await axiosInstance.post("/tasks", task);

      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }

  static async updateTask(taskId: string, task: Partial<TaskProps>) {
    try {
      const response = await axiosInstance.put(`/tasks/${taskId}`, task);

      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }

  static async deleteTask(taskId: string) {
    try {
      const response = await axiosInstance.delete(`/tasks/${taskId}`);

      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }

  static filterTasksByStatus(tasks: TaskProps[], status: TaskStatus) {
    if (status === TaskStatus.ALL) {
      return tasks;
    }

    return tasks.filter((task) => task.status === status);
  }

  static filterTasksByTitle(tasks: TaskProps[], title: string) {
    return tasks.filter((task) => task.title.includes(title));
  }
}
