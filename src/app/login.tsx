import { Stack } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text, ActivityIndicator } from "react-native-paper";
import useAuth from "@/hooks/use-auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { 
    authState: { isLoading, error: authError },
    authActions: { login, clearError }
  } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      clearError();
      // Podrías manejar este error de validación localmente
      // o pasarlo al store si prefieres centralizarlo
      return;
    }
    await login(email, password);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "Iniciar Sesión",
          headerLeft: () => null,
        }}
      />

      <Text style={styles.title}>Iniciar Sesión</Text>
      
      <TextInput
        label="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        disabled={isLoading}
      />
      
      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        disabled={isLoading}
      />
      
      {authError ? (
        <Text style={styles.error} onPress={clearError}>
          {authError}
        </Text>
      ) : null}
      
      <Button 
        mode="contained" 
        onPress={handleLogin} 
        style={styles.button}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          "Iniciar Sesión"
        )}
      </Button>
    </View>
  );
};

// Los estilos se mantienen igual
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default LoginScreen;