import { Text, View } from "react-native";
import { useRouter } from 'expo-router';
import { Button } from "react-native-paper";

export default function Config() {

  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Configuración</Text>

      <Button onPress={() => router.navigate('/(games)/tetris')}>Prueba juego</Button>

    </View>
  );
}
