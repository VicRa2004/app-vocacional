import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Pregunta } from '@/types/carrera';

type Props = {
  pregunta: Pregunta;
  index: number;
  onChangeResultado: (index: number, resultado: number) => void;
};

const opciones = [
  { valor: 1, label: '😐 Nada' },
  { valor: 2, label: '🙂 Poco' },
  { valor: 3, label: '😃 Algo' },
  { valor: 4, label: '🤩 Mucho' },
  { valor: 5, label: '🔥 ¡Me encanta!' },
];

const PreguntaItem: React.FC<Props> = ({ pregunta, index, onChangeResultado }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.pregunta}>{pregunta.nombre}</Text>
      <View style={styles.opciones}>
        {opciones.map((op) => (
          <TouchableOpacity
            key={op.valor}
            style={[
              styles.opcion,
              pregunta.resultado === op.valor && styles.opcionSeleccionada,
            ]}
            onPress={() => onChangeResultado(index, op.valor)}
          >
            <Text style={styles.opcionTexto}>{op.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  pregunta: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  opciones: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  opcion: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    margin: 4,
  },
  opcionSeleccionada: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  opcionTexto: {
    color: '#000',
  },
});

export default PreguntaItem;
