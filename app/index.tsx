import { Button } from "@/components/ui/button";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hola mundo desde React Native</Text>
      <Link href="/tetris">Ir a Tetris</Link>
      <Button
        variant="danger"
        action={() => alert("Se presiono el boton")}
        text="Hola mundo"
      />
    </View>
  );
}
