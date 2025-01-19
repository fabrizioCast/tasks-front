import { Dialog, Portal, Text, useTheme } from "react-native-paper";
import Button from "./ui/Button";
import { ScrollView, StyleSheet } from "react-native";

interface DialogConfirmActionProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;

  title?: string;
  message?: string;
  btnConfirmText?: string;
  btnCancelText?: string;
  preventClose?: boolean;
}

export default function DialogConfirmAction({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  btnConfirmText,
  btnCancelText,
  preventClose = false,
}: DialogConfirmActionProps) {
  const theme = useTheme();

  const handleConfirm = () => {
    onConfirm();

    if (!preventClose) {
      onClose();
    }
  };

  return (
    <Portal>
      <Dialog visible={isOpen} onDismiss={onClose} style={styles.dialogWrapper}>
        <Dialog.Title style={styles.dialogTitle}>{title || "Confirmar acción"}</Dialog.Title>
        <Dialog.ScrollArea style={styles.scrollArea}>
          <ScrollView style={styles.dialogContent}>
            <Text style={styles.dialogMessage}>{message || "Estas seguro de realizar esta acción?"}</Text>
          </ScrollView>
        </Dialog.ScrollArea>

        <Dialog.Actions style={styles.dialogActions}>
          <Button
            mode="outlined"
            theme={{ colors: { outline: theme.colors.error } }}
            labelStyle={{ color: theme.colors.error }}
            onPress={onClose}
          >
            {btnCancelText || "No, Cancelar"}
          </Button>
          <Button mode="contained" buttonColor={theme.colors.primary} textColor="#FFFFFF" onPress={handleConfirm}>
            {btnConfirmText || "Si, Confirmar"}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialogWrapper: {
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  dialogTitle: {
    fontSize: 17,
    fontFamily: "bold",

    marginTop: 16,
    marginBottom: 14,
  },
  dialogMessage: {
    fontSize: 16,
  },
  scrollArea: {
    borderColor: "#ddd",
    marginBottom: 5,
  },
  dialogContent: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  dialogActions: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
