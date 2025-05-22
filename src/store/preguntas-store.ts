// store/preguntas-store.ts
import { create } from 'zustand';
import { Pregunta } from '@/types/carrera';

type PreguntasState = {
  resultados: Pregunta[];
  responderPregunta: (pregunta: Pregunta) => void;
  reiniciar: () => void;
  obtenerResultados: () => Pregunta[];
};

export const usePreguntasStore = create<PreguntasState>((set, get) => ({
  resultados: [],

  responderPregunta: (pregunta) =>
    set((state) => {
      const existentes = state.resultados.filter(p => p.nombre !== pregunta.nombre);
      return { resultados: [...existentes, pregunta] };
    }),

  reiniciar: () => set(() => ({ resultados: [] })),

  obtenerResultados: () => get().resultados,
}));
