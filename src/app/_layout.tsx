import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerLeft: () => (
            <Text style={{ fontSize: 20, color: "", fontWeight: 500 }}>
              App Vocacional
            </Text>
          ),
          headerTitle: () => null,
        }}
      />
    </View>
  );
}
