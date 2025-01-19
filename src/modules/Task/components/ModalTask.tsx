import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/src/components/ui/Modal";
import { TaskForm, TaskFormSchema } from "../schemas/TaskFormSchema";
import { TaskProps, TaskStatus } from "../interface/Task";
import Select from "@/src/components/ui/Select";
import { TaskService } from "../services/Task.service";

interface ModalTaskProps {
  isOpen: boolean;
  setModal: (p: { isOpen: boolean; task: TaskProps | null }) => void;
  task: TaskProps | null;
  getTasks: () => Promise<void>;
}

export default function ModalTask({ isOpen, setModal, task, getTasks }: ModalTaskProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskForm>({
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description || "",
      status: task?.status || TaskStatus.PENDING,
    },
    resolver: zodResolver(TaskFormSchema),
  });

  const handleClose = () => {
    reset();
    setModal({ isOpen: false, task: null });
  };

  const handleFormSubmit = async (data: TaskForm) => {
    try {
      if (task?.id) {
        await TaskService.updateTask(task.id, data);
      } else {
        await TaskService.createTask(data);
      }

      await getTasks();
      handleClose();
    } catch (error) {
      console.error("Error al enviar la tarea:", error);
    }
  };

  return (
    <Modal
      isVisible={isOpen}
      title={task ? `Editar tarea "${task.title}"` : "Nueva tarea"}
      onRequestClose={handleClose}
    >
      <View style={styles.formWrapper}>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput mode="outlined" label="Título" value={value} onChangeText={onChange} error={!!errors.title} />
              {errors.title && <HelperText type="error">{errors.title.message}</HelperText>}
            </>
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                mode="outlined"
                label="Descripción"
                value={value}
                onChangeText={onChange}
                error={!!errors.description}
                multiline
              />
              {errors.description && <HelperText type="error">{errors.description.message}</HelperText>}
            </>
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <Select
                items={[
                  { label: "Pendiente", value: TaskStatus.PENDING },
                  { label: "En progreso", value: TaskStatus.IN_PROGRESS },
                  { label: "Completada", value: TaskStatus.COMPLETED },
                ]}
                label="Estado"
                onChange={onChange}
                value={value}
              />
              {errors.status && <HelperText type="error">{errors.status.message}</HelperText>}
            </>
          )}
        />

        <Button mode="contained" onPress={handleSubmit(handleFormSubmit)} style={styles.saveBtn}>
          {task ? "Guardar cambios" : "Crear tarea"}
        </Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    gap: 10,
  },
  saveBtn: {
    marginTop: 16,
  },
});
