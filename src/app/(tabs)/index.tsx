import { Link } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido al Test Vocacional</Text>
      <Text style={styles.description}>
        Descubre tu vocación a través de divertidos juegos diseñados para
        evaluar tus habilidades y preferencias.
      </Text>
      <Link href="/login" asChild>
        <Button mode="contained" style={styles.button}>
          Iniciar Sesión
        </Button>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});

export default HomeScreen;
