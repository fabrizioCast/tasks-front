import { BORDER_RADIUS } from "@/src/config/theme";
import { StyleSheet } from "react-native";
import { Button as ButonRN, ButtonProps } from "react-native-paper";

export default function Button({ style = {}, ...props }: ButtonProps) {
  return (
    <ButonRN
      compact
      style={[styles.button, style]}
      labelStyle={[styles.label, props.labelStyle]}
      theme={{
        colors: {
          outline: props.mode === "outlined" ? props.textColor : "transparent",
        },
      }}
      {...props}
    >
      {props.children}
    </ButonRN>
  );
}

const styles = StyleSheet.create({
  button: {
    // paddingVertical: 2,
    // paddingHorizontal: 8,
    borderRadius: BORDER_RADIUS,
  },
  label: {
    fontFamily: "bold",
  },
});
