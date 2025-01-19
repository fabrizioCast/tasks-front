import { useEffect, useState } from "react";
import { TaskProps } from "../interface/Task";
import { TaskService } from "../services/Task.service";

export default function useTask() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTasks = async () => {
    try {
      setIsLoading(true);

      const tasks = await TaskService.getTasks();

      setTasks(tasks);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return { tasks, isLoading, error, getTasks };
}
