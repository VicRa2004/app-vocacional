import { Text, View } from "react-native";
import { useRouter } from 'expo-router';
import { Button } from "react-native-paper";

export default function Config() {

  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Configuración</Text>

      <Text>Pruebas</Text>

      <Button onPress={() => router.navigate('/(games)/tetris')}>Prueba tetris</Button>

      <Button onPress={() => router.navigate('/(games)/gato')}>Prueba Gato</Button>

      <Button onPress={() => router.navigate('/(games)/snake')}>Prueba Serpiente</Button>

      <Button onPress={() => router.navigate('/(games)/trivia')}>Prueba Trivia</Button>

      <Button onPress={() => router.navigate('/(games)/memory')}>Prueba Memoria</Button>

    </View>
  );
}


