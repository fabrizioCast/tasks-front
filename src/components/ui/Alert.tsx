import { AppTheme } from "@/src/config/theme";
import colorsea from "colorsea";
import { View, StyleSheet, ViewProps } from "react-native";
import { Icon, useTheme } from "react-native-paper";

interface AlertProps extends ViewProps {
  severity: "error" | "warning" | "info" | "success";
  children: React.ReactNode;
  icon?: string;
}

export default function Alert({ severity, children, ...rest }: AlertProps) {
  const { colors } = useTheme<AppTheme>();

  const COLORS = {
    error: colorsea(colors.error).lightness(95).hex(),
    warning: colorsea("#ffad1a").lightness(95).hex(),
    info: colorsea(colors.primary).lightness(95).hex(),
    success: colorsea("#0CC042").lightness(95).hex(),
  };

  const ICONS = {
    error: {
      name: "alert-circle-outline",
      color: colors.error,
    },
    warning: {
      name: "alert-outline",
      color: "#ffad1a",
    },
    info: {
      name: "information-outline",
      color: colors.primary,
    },
    success: {
      name: "check-circle-outline",
      color: "#0CC042",
    },
  };

  const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: COLORS[severity],
      padding: 10,
      borderRadius: 10,
      flexDirection: "row",
      gap: 4,
    },
  });

  const srcIcon = rest.icon || ICONS[severity].name;

  return (
    <View {...rest} style={[styles.wrapper, rest.style]}>
      <Icon source={srcIcon} size={25} color={ICONS[severity].color} />

      <View>{children}</View>
    </View>
  );
}
