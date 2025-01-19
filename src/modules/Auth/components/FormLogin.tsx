import Button from "@/src/components/ui/Button";
import { StyleSheet, Text, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm, LoginFormSchema } from "../schemas/LoginFormSchema";

interface FormLoginProps {
  onSubmit: (data: { username: string; password: string }) => void;
}

export default function FormLogin({ onSubmit }: FormLoginProps) {
  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(LoginFormSchema),
  });

  const handleSubmitForm = (data: LoginForm) => {
    onSubmit(data);
  };

  return (
    <View style={styles.formWrapper}>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput mode="outlined" label="Usuario" value={value} onChangeText={onChange} error={!!error} />

            {error && <HelperText type="error">{error.message}</HelperText>}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              mode="outlined"
              label="Contraseña"
              value={value}
              onChangeText={onChange}
              error={!!error}
              secureTextEntry
            />

            {error && <HelperText type="error">{error.message}</HelperText>}
          </>
        )}
      />

      <Button style={styles.loginBtn} mode="contained" onPress={() => handleSubmit(handleSubmitForm)()}>
        <Text style={styles.loginBtnText}>Iniciar sesión</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  loginBtn: {
    marginTop: 15,
  },
  loginBtnText: {
    color: "#fff",
  },
});
