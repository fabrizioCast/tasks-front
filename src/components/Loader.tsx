import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.title}>Cargando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "bold",
  },
});
