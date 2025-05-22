// components/ListaPreguntas.tsx
import React from 'react';
import PreguntaItem from './PreguntaItem';
import { Pregunta } from '@/types/carrera';
import { usePreguntasStore } from '@/store/preguntas-store';

type Props = {
  preguntas: Pregunta[];
};

const ListaPreguntas: React.FC<Props> = ({ preguntas }) => {
  const { responderPregunta } = usePreguntasStore();

  const onChangeResultado = (index: number, resultado: number) => {
    const pregunta = preguntas[index];
    console.log(pregunta, resultado);
    responderPregunta({ ...pregunta, resultado });
  };

  return (
    <>
      {preguntas.map((pregunta, index) => (
        <PreguntaItem
          key={index}
          pregunta={pregunta}
          index={index}
          onChangeResultado={onChangeResultado}
        />
      ))}
    </>
  );
};

export default ListaPreguntas;
