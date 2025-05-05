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

    </View>
  );
}


/**
 * Estoy usando React Native y expo para hacer una app móvil que tiene algunos juegos, puedes por favor darme el código para un juego 
 */

