import { View } from "react-native";
import Picker from "./Picker";
import { PickerSelectProps } from "react-native-picker-select";

interface SelectProps extends Omit<PickerSelectProps, "onValueChange"> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
}

export default function Select({ label, value, onChange, error, helperText, items, ...props }: SelectProps) {
  return (
    <View>
      <Picker
        {...props}
        value={value}
        onChange={onChange}
        label={label}
        error={error}
        helperText={helperText}
        doneText="Listo"
        items={items}
      />
    </View>
  );
}
