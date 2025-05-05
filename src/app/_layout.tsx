import { Stack } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import useAuth from "../hooks/use-auth";

export default function RootLayout() {
  const { authState: { isAuthenticated, isLoading } } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
    screenOptions={{
      headerShown: true,
      title: 'Sistema de Eventos',
      headerStyle: {
        // Poner un color morado claro
        backgroundColor: '#6a1b9a', 
      },
      headerTintColor: '#fff',
    }}
    >
      {!isAuthenticated ? (
        <Stack.Screen name="(auth)/index" options={{ headerShown: true }} />
      ) : (
        <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
      )}
    </Stack>
  );
}