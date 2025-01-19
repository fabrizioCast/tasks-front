import React, { useEffect, useState } from "react";
import { Image, StyleSheet, ToastAndroid, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import FormLogin from "../components/FormLogin";
import { useAuth } from "@/src/context/authContext";
import { Link, useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import Alert from "@/src/components/ui/Alert";

export default function LoginScreen() {
  const { login, user, isAuth, isLoading } = useAuth();

  const { colors } = useTheme();

  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation();

  useEffect(() => {
    if (isAuth && !isLoading) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "dashboard" }],
        })
      );
    }
  }, [isAuth]);

  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      await login(data);

      ToastAndroid.show(`Bienvenido`, ToastAndroid.SHORT);
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image source={require("../../../assets/images/logo.jpeg")} style={{ width: 200, height: 150 }} />
        </View>

        <Text style={styles.welcomeText}>Bienvenido</Text>

        <FormLogin onSubmit={onSubmit} />

        <Link href="/register" style={{ marginTop: 20 }}>
          <Text>
            ¿No tienes cuenta? <Text style={{ color: colors.primary, fontFamily: "bold" }}>Regístrate</Text>
          </Text>
        </Link>

        {error && (
          <Alert severity="error" style={{ marginTop: 20 }}>
            <Text style={{ color: "#000" }}>{error}</Text>
          </Alert>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "bold",
  },
  imageWrapper: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
});
