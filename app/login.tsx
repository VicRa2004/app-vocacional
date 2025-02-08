import Button from "@/components/ui/button";
import { Text, View } from "react-native";

export default function Login() {
  return (
    <View>
      <Text>Iniciar Sesión</Text>
      <Button action={() => alert("Hola")} text="Iniciar sesion" />
    </View>
  );
}
