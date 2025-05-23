// store/preguntas-store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pregunta } from '@/types/carrera';

type PreguntasState = {
  resultados: Pregunta[];
  responderPregunta: (pregunta: Pregunta) => void;
  reiniciar: () => void;
  obtenerResultados: () => Pregunta[];
};

export const usePreguntasStore = create<PreguntasState>()(
  persist(
    (set, get) => ({
      resultados: [],

      responderPregunta: (pregunta) =>
        set((state) => {
          const existentes = state.resultados.filter(p => p.nombre !== pregunta.nombre);
          return { resultados: [...existentes, pregunta] };
        }),

      reiniciar: () => set(() => ({ resultados: [] })),

      obtenerResultados: () => get().resultados,
    }),
    {
      name: 'preguntas-storage', // Nombre único para el storage
      storage: createJSONStorage(() => AsyncStorage), // Usamos AsyncStorage de React Native
      // Opcional: seleccionar qué partes del estado persistir
      partialize: (state) => ({ resultados: state.resultados }),
    }
  )
);