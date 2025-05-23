import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import {usePreguntasStore} from '@/store/preguntas-store'
import {useJuegosStore} from '@/store/juegos-store'

export default function Tests() {

  const {reiniciar: rePreguntas} = usePreguntasStore()
  const {reiniciar: reJuegos} = useJuegosStore()

  const handleReiniciar = () => {
    rePreguntas()
    reJuegos()
  }


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Mi Test</Text>

      <Button onPress={handleReiniciar}>Reiniciar test</Button>

    </View>
  );
}


