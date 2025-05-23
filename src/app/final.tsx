import { useJuegosStore } from "@/store/juegos-store";
import { usePreguntasStore } from "@/store/preguntas-store";
import { Text, View } from "react-native";

export default function Final() {

    const {obtenerResultados: resPreguntas} =usePreguntasStore();
    const {obtenerResultados: resGames} = useJuegosStore();

    

  return (
    <View>
      <Text>Final</Text>
    </View>
  );
}
