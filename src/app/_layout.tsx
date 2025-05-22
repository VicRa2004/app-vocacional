// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "CareerCraft",
        headerStyle: { backgroundColor: "#6a1b9a" },
        headerTintColor: "#fff",
      }}
    >
      {/* Pantalla index vacía - solo para estructura */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen name="login" options={{ title: "Iniciar Sesión" }} />

      <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
    </Stack>
  );
}
