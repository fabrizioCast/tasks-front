import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "@/src/context/authContext";
import { router, Stack, useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Layout() {
  const { isAuth, isLoading } = useAuth();

  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },
  });

  const navigation = useNavigation();

  useEffect(() => {
    if (!isAuth && !isLoading) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "login" }],
        })
      );
    }
  }, [isAuth, isLoading]);

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#fff",
          },
        }}
      />
    </View>
  );
}
