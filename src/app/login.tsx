import { router, Stack } from "expo-router";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  TextInput,
  Button,
  Text,
  ActivityIndicator,
  useTheme,
} from "react-native-paper";
import useAuth from "@/hooks/use-auth";
import { MaterialIcons } from "@expo/vector-icons";

const LoginScreen = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const {
    authState: { isLoading, error: authError },
    authActions: { login, clearError },
  } = useAuth();

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      //alert('se esta iniciando sesion');
      const success = await login(email, password);

      if (success) {
        // Redirigir manualmente después de login exitoso
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const validateForm = () => {
    clearError();

    if (!email.trim()) {
      alert("Por favor ingresa tu correo electrónico");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Por favor ingresa un correo electrónico válido");
      return false;
    }

    if (!password.trim()) {
      alert("Por favor ingresa tu contraseña");
      return false;
    }

    return true;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Stack.Screen
        options={{
          headerTitle: "Iniciar Sesión",
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: "#fff",
        }}
      />

      <View style={styles.content}>
        <MaterialIcons
          name="account-circle"
          size={100}
          color={theme.colors.primary}
          style={styles.icon}
        />

        <Text variant="headlineMedium" style={styles.title}>
          Bienvenido
        </Text>

        <Text variant="bodyMedium" style={styles.subtitle}>
          Ingresa tus credenciales para continuar
        </Text>

        <TextInput
          label="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          style={styles.input}
          disabled={isLoading}
          left={<TextInput.Icon icon="email" />}
          mode="outlined"
        />

        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
          style={styles.input}
          disabled={isLoading}
          left={<TextInput.Icon icon="lock" />}
          right={
            <TextInput.Icon
              icon={secureText ? "eye-off" : "eye"}
              onPress={() => setSecureText(!secureText)}
            />
          }
          mode="outlined"
        />

        {authError && (
          <View style={styles.errorContainer}>
            <MaterialIcons
              name="error-outline"
              size={20}
              color={theme.colors.error}
            />
            <Text style={styles.error} onPress={clearError}>
              {authError}
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>
            ¿Olvidaste tu contraseña?
          </Text>
        </TouchableOpacity>

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          disabled={isLoading}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          {isLoading ? <ActivityIndicator color="#fff" /> : "Iniciar Sesión"}
        </Button>

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿No tienes una cuenta?</Text>
          <TouchableOpacity>
            <Text style={styles.signUpText}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  icon: {
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 32,
    color: "#666",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
    paddingVertical: 8,
  },
  buttonContent: {
    height: 48,
  },
  buttonLabel: {
    fontSize: 16,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    padding: 8,
    backgroundColor: "#ffeeee",
    borderRadius: 4,
  },
  error: {
    color: "red",
    marginLeft: 8,
    flex: 1,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: "#666",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: "#666",
  },
  signUpText: {
    color: "#1976d2",
    marginLeft: 4,
    fontWeight: "bold",
  },
});

export default LoginScreen;
