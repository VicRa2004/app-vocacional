import { Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { usePreguntasStore } from '@/store/preguntas-store';
import { router } from 'expo-router';
import ListaPreguntas from '@/components/ListaPreguntas';
import { Pregunta } from '@/types/carrera';
import { PREGUNTAS_2 } from '@/data/preguntas-2';

const VistaPreguntas: React.FC = () => {
  const { obtenerResultados } = usePreguntasStore();

  const preguntas: Pregunta[] = PREGUNTAS_2;

  const siguiente = () => {
    const resultados = obtenerResultados();
    const sinResponder = preguntas.some(
      (p) => !resultados.find((r) => r.nombre === p.nombre)
    );

    if (sinResponder) {
      Alert.alert('Faltan respuestas', 'Responde todas las preguntas antes de continuar.');
      return;
    }

    console.log('Respuestas:', resultados);
    Alert.alert('¡Listo!', 'Sigue con los juegos');
    router.replace('/(games)/gato');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Cuestionario de Intereses</Text>

      <ListaPreguntas preguntas={preguntas} />

      <TouchableOpacity style={styles.enviarBtn} onPress={siguiente}>
        <Text style={styles.enviarBtnText}>Siguiente ➡️</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  enviarBtn: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 10,
    marginTop: 16,
  },
  enviarBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default VistaPreguntas;
