import React from 'react';
import { Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import PreguntaItem from '@/components/PreguntaItem';
import { usePreguntasStore } from '@/store/preguntas-store';
import { Carrera } from '@/types/carrera';
import { useNavigation } from '@react-navigation/native';

const VistaPreguntas: React.FC = () => {
  const navigation = useNavigation();

  const {
    preguntas,
    carreras,
    responderPregunta,
    agregarPregunta,
    setCarreras,
    obtenerResultados,
  } = usePreguntasStore();

  // Si aún no se han cargado preguntas, lo hacemos (solo una vez)
  React.useEffect(() => {
    if (preguntas.length === 0) {
      const carrerasEjemplo: Carrera[] = [
        { id: 1, nombre: 'Ingeniería' },
        { id: 2, nombre: 'Psicología' },
        { id: 3, nombre: 'Diseño Gráfico' },
      ];

      setCarreras(carrerasEjemplo);

      const nuevas = [
        {
          nombre: '¿Te gusta resolver problemas lógicos?',
          resultado: 0,
          tiposDeCarrera: [carrerasEjemplo[0]],
        },
        {
          nombre: '¿Te interesa entender el comportamiento humano?',
          resultado: 0,
          tiposDeCarrera: [carrerasEjemplo[1]],
        },
        {
          nombre: '¿Disfrutas crear cosas visuales?',
          resultado: 0,
          tiposDeCarrera: [carrerasEjemplo[2]],
        },
        {
          nombre: '¿Te gusta programar y construir cosas con código?',
          resultado: 0,
          tiposDeCarrera: [carrerasEjemplo[0]],
        },
        {
          nombre: '¿Te gustaría ayudar a personas a superar dificultades?',
          resultado: 0,
          tiposDeCarrera: [carrerasEjemplo[1]],
        },
      ];

      nuevas.forEach(agregarPregunta);
    }
  }, []);

  const actualizarResultado = (index: number, resultado: number) => {
    responderPregunta(index, resultado);
  };

  const siguiente = () => {
    const sinResponder = preguntas.some((p) => p.resultado === 0);
    if (sinResponder) {
      Alert.alert('Faltan respuestas', 'Responde todas las preguntas antes de continuar.');
      return;
    }

    const respuestas = obtenerResultados();
    console.log('Respuestas:', respuestas);

    // Aquí podrías navegar a la vista de juegos o resultados
    Alert.alert('¡Listo!', 'Ahora puedes pasar a los juegos o ver tu resultado.');

    // navigation.navigate('VistaJuegos'); // Ejemplo
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Cuestionario de Intereses</Text>

      {preguntas.map((pregunta, index) => (
        <PreguntaItem
          key={index}
          pregunta={pregunta}
          index={index}
          onChangeResultado={actualizarResultado}
        />
      ))}

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
