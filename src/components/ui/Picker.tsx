import { Platform, StyleSheet, View } from "react-native";
import { HelperText, Icon, useTheme } from "react-native-paper";
import RNPickerSelect, { PickerSelectProps } from "react-native-picker-select";

interface PickerProps extends Omit<PickerSelectProps, "onValueChange"> {
  label: string;
  error?: boolean;
  helperText?: string;
  onChange: (value: string) => void;
}

export default function Picker({ items, value, label, error, helperText, onChange, ...props }: PickerProps) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      borderRadius: 8,
      color: "black",
      paddingRight: 30,
      backgroundColor: theme.colors.background,
      marginBottom: 20,
      height: 52,
    },
    placeholder: {
      color: theme.colors.onSurface,
    },
    iconContainer: {
      top: Platform.OS === "ios" ? 14 : 18,
      right: 12,
    },

    inputAndroid: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      borderRadius: 8,
      color: "black",
      paddingRight: 30,
      backgroundColor: theme.colors.background,
      marginBottom: 20,
      height: 52,
    },
  });

  const IconDropdown = <Icon source="chevron-down" size={24} />;

  return (
    <View>
      {/* <HelperText type="info">{label}</HelperText> */}

      <RNPickerSelect
        {...props}
        items={items}
        value={value}
        style={styles}
        onValueChange={onChange}
        useNativeAndroidPickerStyle={false}
        Icon={() => IconDropdown}
        placeholder={{
          label,
          value: null,
        }}
      />

      {error && <HelperText type="error">{helperText}</HelperText>}
    </View>
  );
}
