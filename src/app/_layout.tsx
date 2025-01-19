import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { PaperProvider } from "react-native-paper";

import { useColorScheme } from "@/src/hooks/useColorScheme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../context/authContext";
import { customTheme } from "../config/theme";

import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/poppins";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    normal: Poppins_400Regular,
    medium: Poppins_500Medium,
    semiBold: Poppins_600SemiBold,
    bold: Poppins_700Bold,
    extraBold: Poppins_800ExtraBold,
    thin: Poppins_100Thin,
    extraLight: Poppins_200ExtraLight,
    light: Poppins_300Light,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <PaperProvider theme={customTheme}>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </PaperProvider>
    </AuthProvider>
  );
}
