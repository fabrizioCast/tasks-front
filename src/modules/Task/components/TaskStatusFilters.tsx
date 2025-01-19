import { View, Text } from "react-native";
import React from "react";
import Select from "@/src/components/ui/Select";
import { HelperText } from "react-native-paper";
import { TaskStatus } from "../interface/Task";

interface TaskStatusFiltersProps {
  value: string;
  onChange: (value: TaskStatus) => void;
}

export default function TaskStatusFilters({ value, onChange }: TaskStatusFiltersProps) {
  return (
    <View>
      <HelperText type="info">Seleccione un estado para filtrar las tareas</HelperText>
      <Select
        items={[
          { label: "Todos", value: TaskStatus.ALL },
          { label: "Pendiente", value: TaskStatus.PENDING },
          { label: "En progreso", value: TaskStatus.IN_PROGRESS },
          { label: "Completada", value: TaskStatus.COMPLETED },
        ]}
        label="Estado"
        onChange={(value) => onChange(value as TaskStatus)}
        value={value}
      />
    </View>
  );
}
