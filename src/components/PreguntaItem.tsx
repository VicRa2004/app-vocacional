import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Pregunta } from '@/types/carrera';
import { usePreguntasStore } from '@/store/preguntas-store';

type Props = {
  pregunta: Pregunta;
  index: number;
  onChangeResultado: (index: number, resultado: number) => void;
};

const opciones = [
  { valor: 1, label: 'Nada de interés' },
  { valor: 2, label: 'Poco interés' },
  { valor: 3, label: 'Algo de interés' },
  { valor: 4, label: 'Mucho interés' },
  { valor: 5, label: 'Pasión total' },
];

const PreguntaItem: React.FC<Props> = ({ pregunta, index, onChangeResultado }) => {
  const resultadoActual = usePreguntasStore((state) =>
    state.resultados.find((p) => p.nombre === pregunta.nombre)?.resultado ?? 0
  );

  return (
    <View style={styles.card}>
      <Text style={styles.pregunta}>{pregunta.nombre}</Text>
      <View style={styles.opciones}>
        {opciones.map((op) => (
          <TouchableOpacity
            key={op.valor}
            style={[
              styles.opcion,
              resultadoActual === op.valor && styles.opcionSeleccionada,
            ]}
            onPress={() => onChangeResultado(index, op.valor)}
          >
            <Text
              style={[
                styles.opcionTexto,
                resultadoActual === op.valor && styles.opcionTextoSeleccionada,
              ]}
            >
              {op.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pregunta: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  opciones: {
    flexDirection: 'column',
    gap: 10,
  },
  opcion: {
    backgroundColor: '#f8f9fa',
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  opcionSeleccionada: {
    backgroundColor: '#0d6efd',
    borderColor: '#0d6efd',
  },
  opcionTexto: {
    color: '#212529',
    fontSize: 15,
    textAlign: 'center',
  },
  opcionTextoSeleccionada: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default PreguntaItem;
