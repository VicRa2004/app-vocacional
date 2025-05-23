import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useJuegosStore } from "@/store/juegos-store";
import { usePreguntasStore } from "@/store/preguntas-store";
import { Carrera, Pregunta, Juego } from "@/types/carrera";
import { ActivityIndicator } from "react-native-paper";
import { useUrl } from "@/hooks/use-url";
import { AuthService } from "@/services/test.service";
import useAuth from "@/hooks/use-auth";

export default function Final() {
  const { obtenerResultados: obtenerPreguntas } = usePreguntasStore();
  const { obtenerResultados: obtenerJuegos } = useJuegosStore();
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { currentUrl: url } = useUrl();
  const {
    authState: { user },
  } = useAuth();

  // Convertir resultados a arrays asegurando que sean iterables
  const resPreguntas: Pregunta[] = Array.isArray(obtenerPreguntas())
    ? obtenerPreguntas()
    : [];
  const resGames: Juego[] = Array.isArray(obtenerJuegos())
    ? obtenerJuegos()
    : [];

  // Combinar resultados de preguntas y juegos con verificación
  const allResults = React.useMemo(() => {
    try {
      return [...resPreguntas, ...resGames];
    } catch (e) {
      console.error("Error combinando resultados:", e);
      return [];
    }
  }, [resPreguntas, resGames]);

  // Calcular carreras recomendadas con manejo de errores
  const calcularCarrerasRecomendadas = (): Carrera[] => {
    try {
      const carreraScores: Record<number, { carrera: Carrera; score: number }> =
        {};

      allResults.forEach((item) => {
        if (!item?.tiposDeCarrera) return;

        item.tiposDeCarrera.forEach((carrera) => {
          if (!carrera?.id) return;

          if (!carreraScores[carrera.id]) {
            carreraScores[carrera.id] = {
              carrera: carrera,
              score: 0,
            };
          }

          const scoreToAdd = "puntaje" in item ? item.puntaje : item.resultado;
          if (typeof scoreToAdd === "number") {
            carreraScores[carrera.id].score += scoreToAdd;
          }
        });
      });

      return Object.values(carreraScores)
        .sort((a, b) => b.score - a.score)
        .map((item) => item.carrera)
        .filter(Boolean);
    } catch (error) {
      console.error("Error calculando carreras recomendadas:", error);
      return [];
    }
  };

  const carrerasRecomendadas = calcularCarrerasRecomendadas();

  const enviarResultados = async () => {
    setIsSending(true);
    setError(null);

    const authService = new AuthService(url);

    try {
      if (user) {
        const res = authService.saveTest({
          id: user.id,
          preguntas: resPreguntas,
          juegos: resGames,
        });

        console.log(res);

        Alert.alert("Éxito", "Tus resultados han sido guardados");
      } else {
        Alert.alert("Error", "Usuario no registrado");
      }
    } catch (err) {
      setError("Error al enviar los resultados");
      console.error("Error enviando resultados:", err);
    } finally {
      setIsSending(false);
    }
  };

  if (!allResults.length) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="warning" size={48} color="#f39c12" />
        <Text style={styles.emptyText}>No hay resultados disponibles</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons name="trophy" size={32} color="#f39c12" />
        <Text style={styles.title}>Tus Resultados</Text>
      </View>

      {/* Sección de Carreras Recomendadas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Carreras Recomendadas</Text>
        {carrerasRecomendadas.slice(0, 3).map((carrera, index) => (
          <View key={`${carrera.id}-${index}`} style={styles.carreraCard}>
            <View style={styles.medalContainer}>
              {index === 0 && (
                <Ionicons name="medal" size={24} color="#f1c40f" />
              )}
              {index === 1 && (
                <Ionicons name="medal" size={24} color="#95a5a6" />
              )}
              {index === 2 && (
                <Ionicons name="medal" size={24} color="#e67e22" />
              )}
            </View>
            <Text style={styles.carreraNombre}>{carrera.nombre}</Text>
          </View>
        ))}
      </View>

      {/* Sección de Detalles por Prueba */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detalle por Pruebas</Text>

        {resPreguntas?.map((pregunta, index) => (
          <View key={`pregunta-${index}`} style={styles.resultItem}>
            <Text style={styles.resultTitle}>{pregunta.nombre}</Text>
            <Text style={styles.resultScore}>
              Puntaje: {pregunta.resultado}
            </Text>
            <View style={styles.carrerasContainer}>
              {pregunta.tiposDeCarrera?.map((carrera) => (
                <Text key={`p-${carrera.id}`} style={styles.carreraTag}>
                  {carrera.nombre}
                </Text>
              ))}
            </View>
          </View>
        ))}

        {resGames?.map((juego, index) => (
          <View key={`juego-${index}`} style={styles.resultItem}>
            <Text style={styles.resultTitle}>{juego.nombre}</Text>
            <Text style={styles.resultScore}>Puntaje: {juego.puntaje}</Text>
            <View style={styles.carrerasContainer}>
              {juego.tiposDeCarrera?.map((carrera) => (
                <Text key={`g-${carrera.id}`} style={styles.carreraTag}>
                  {carrera.nombre}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Botón para enviar resultados */}
      <TouchableOpacity
        style={styles.sendButton}
        onPress={enviarResultados}
        disabled={isSending}
      >
        {isSending ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.sendButtonText}>Guardar Resultados</Text>
        )}
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Resumen Final */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryText}>
          Basado en tus resultados, estas son las carreras que mejor se adaptan
          a tus habilidades e intereses.
        </Text>
        <Text style={styles.summaryText}>
          Recuerda que esta es solo una guía y debes considerar otros factores
          al elegir tu carrera.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#7f8c8d",
    marginTop: 20,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    marginLeft: 10,
  },
  section: {
    marginBottom: 25,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#3498db",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },
  carreraCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  medalContainer: {
    width: 30,
    alignItems: "center",
    marginRight: 10,
  },
  carreraNombre: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2c3e50",
  },
  resultItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#34495e",
    marginBottom: 5,
  },
  resultScore: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 8,
  },
  carrerasContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  carreraTag: {
    backgroundColor: "#e3f2fd",
    color: "#1976d2",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  sendButton: {
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#e74c3c",
    textAlign: "center",
    marginVertical: 10,
  },
  summaryCard: {
    backgroundColor: "#e3f2fd",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  summaryText: {
    fontSize: 14,
    color: "#1976d2",
    marginBottom: 8,
    lineHeight: 20,
  },
});
