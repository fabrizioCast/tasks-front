import { View } from "react-native";
import { TextInput } from "react-native-paper";
import useDebounce from "@/src/hooks/useDebouncer";
import { useEffect, useState } from "react";

interface TaskStatusFiltersProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TaskTitleFilter({ value, onChange }: TaskStatusFiltersProps) {
  const [title, setTitle] = useState(value);

  const debouncedTitle = useDebounce(title);

  useEffect(() => {
    onChange(debouncedTitle);
  }, [debouncedTitle]);

  return (
    <View>
      <TextInput mode="outlined" label="Filtrar por título" value={title} onChangeText={setTitle} />
    </View>
  );
}
