import { create } from 'zustand';
import { Pregunta, Carrera } from '@/types/carrera';
import { CARRERAS } from '@/config/carreras'; // Asegúrate de tener este archivo

type PreguntasState = {
  preguntas: Pregunta[];
  carreras: Carrera[];
  agregarPregunta: (pregunta: Pregunta) => void;
  responderPregunta: (index: number, resultado: number) => void;
  setCarreras: (carreras: Carrera[]) => void;
  getCarreras: () => Carrera[]; // ✅ Nueva función
  reiniciar: () => void;
  obtenerResultados: () => Pregunta[];
};

export const usePreguntasStore = create<PreguntasState>((set, get) => ({
  preguntas: [],
  carreras: [],

  agregarPregunta: (pregunta) =>
    set((state) => ({
      preguntas: [...state.preguntas, pregunta],
    })),

  responderPregunta: (index, resultado) =>
    set((state) => {
      const nuevas = [...state.preguntas];
      if (nuevas[index]) {
        nuevas[index].resultado = resultado;
      }
      return { preguntas: nuevas };
    }),

  setCarreras: (carreras) => set(() => ({ carreras })),

  getCarreras: () => {
    const { carreras } = get();
    if (carreras.length === 0) {
      set(() => ({ carreras: CARRERAS }));
      return CARRERAS;
    }
    return carreras;
  },

  reiniciar: () => set(() => ({ preguntas: [], carreras: [] })),

  obtenerResultados: () =>
    get().preguntas.filter((p) => typeof p.resultado === 'number' && p.resultado > 0),
}));
