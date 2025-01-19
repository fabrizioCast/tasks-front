import { StyleSheet, ToastAndroid, View } from "react-native";
import { Text } from "react-native-paper";
import useTask from "../hooks/useTask";
import TaskList from "../components/TaskList";
import { TaskProps, TaskStatus } from "../interface/Task";
import { useEffect, useState } from "react";
import Modal from "@/src/components/ui/Modal";
import Loader from "@/src/components/Loader";
import { TaskService } from "../services/Task.service";
import Button from "@/src/components/ui/Button";
import ModalTask from "../components/ModalTask";
import TaskStatusFilters from "../components/TaskStatusFilters";
import DialogConfirmAction from "@/src/components/DialogConfirmAction";
import TaskTitleFilter from "../components/TaskTitleFilters";

interface ModalTaskProps {
  isOpen: boolean;
  task: TaskProps | null;
}

export default function TaskScreen() {
  const { tasks, isLoading: isLoadingTasks, getTasks } = useTask();

  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState<ModalTaskProps>({ isOpen: false, task: null });
  const [dialogDelete, setDialogDelete] = useState<ModalTaskProps>({ isOpen: false, task: null });

  const [status, setStatus] = useState<TaskStatus>(TaskStatus.PENDING);
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [filteredTasks, setFilteredTasks] = useState<TaskProps[]>([]);

  const handleDelete = (task: TaskProps) => {
    setDialogDelete({ isOpen: true, task });
  };

  const deleteTask = async (task: TaskProps) => {
    try {
      setIsLoading(true);

      await TaskService.deleteTask(task.id);
      await getTasks();

      ToastAndroid.show(`Tarea ${task.title} eliminada`, ToastAndroid.LONG);
    } catch (error) {
      ToastAndroid.show("Error al eliminar la tarea", ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTask = (task: TaskProps | null) => {
    setModal({ isOpen: true, task });
  };

  useEffect(() => {
    if (tasks.length > 0 && !isLoading) {
      const filteredByTitle = TaskService.filterTasksByTitle(tasks, searchTitle);
      const filteredByStatus = TaskService.filterTasksByStatus(filteredByTitle, status);

      setFilteredTasks(filteredByStatus);
    }
  }, [tasks, status, isLoading, searchTitle]);

  const IS_LOADING = isLoading || isLoadingTasks;
  if (IS_LOADING) {
    return (
      <View style={styles.container}>
        <Loader />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de tareas</Text>
        <Button mode="contained" onPress={() => setModal({ isOpen: true, task: null })}>
          Nueva tarea
        </Button>
      </View>

      <TaskTitleFilter value={searchTitle} onChange={setSearchTitle} />
      <TaskStatusFilters value={status} onChange={setStatus} />
      <TaskList tasks={filteredTasks} handleDelete={handleDelete} handleTask={handleTask} />

      <DialogConfirmAction
        isOpen={dialogDelete.isOpen}
        onConfirm={() => deleteTask(dialogDelete.task!)}
        onClose={() => setDialogDelete({ isOpen: false, task: null })}
        title="Eliminar tarea"
      />

      {modal.isOpen && <ModalTask isOpen={modal.isOpen} task={modal.task} setModal={setModal} getTasks={getTasks} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  title: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});
