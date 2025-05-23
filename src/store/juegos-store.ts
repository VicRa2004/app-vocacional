// stores/useJuegosStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Juego, Carrera } from "@/types/carrera";
import { CARRERAS } from "@/config/carreras";

type JuegosState = {
  juegos: Juego[];
  carreras: Carrera[];

  agregarJuego: (
    nombreJuego: string,
    carrerasAsociadas: Carrera[],
    puntaje?: number
  ) => void;
  actualizarPuntaje: (nombreJuego: string, puntaje: number) => void;
  getCarrerasDeJuego: (nombreJuego: string) => Carrera[];
  reiniciar: () => void;
  obtenerResultados: () => Juego[];
};

export const useJuegosStore = create<JuegosState>()(
  persist(
    (set, get) => ({
      juegos: [],
      carreras: CARRERAS,

      agregarJuego: (nombreJuego, carrerasAsociadas, puntaje = 0) =>
        set((state) => ({
          juegos: [
            ...state.juegos,
            {
              nombre: nombreJuego,
              puntaje,
              tiposDeCarrera: carrerasAsociadas,
            },
          ],
        })),

      actualizarPuntaje: (nombreJuego, puntaje) =>
        set((state) => ({
          juegos: state.juegos.map((juego) =>
            juego.nombre === nombreJuego ? { ...juego, puntaje } : juego
          ),
        })),

      getCarrerasDeJuego: (nombreJuego) => {
        const juego = get().juegos.find((j) => j.nombre === nombreJuego);
        return juego ? juego.tiposDeCarrera : [];
      },

      reiniciar: () => set(() => ({ juegos: [], carreras: CARRERAS })),

      obtenerResultados: () =>
        get().juegos.filter((j) => j.puntaje && j.puntaje !== 0),
    }),
    {
      name: "juegos-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        juegos: state.juegos,
        carreras: state.carreras,
      }),
    }
  )
);
