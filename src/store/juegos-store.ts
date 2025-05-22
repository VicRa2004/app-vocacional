// stores/useJuegosStore.ts
import { create } from 'zustand';
import { Juego, Carrera } from '@/types/carrera';
import { CARRERAS } from '@/config/carreras'; // Asegúrate de tener este archivo

type JuegosState = {
  juegos: Juego[];
  carreras: Carrera[];
  
  // Agregar un nuevo juego al store (con sus carreras asociadas)
  agregarJuego: (nombreJuego: string, carrerasAsociadas: Carrera[], puntaje?: number) => void;
  
  // Actualizar el puntaje de un juego por nombre
  actualizarPuntaje: (nombreJuego: string, puntaje: number) => void;
  
  // Obtener las carreras asociadas a un juego específico
  getCarrerasDeJuego: (nombreJuego: string) => Carrera[];
  
  // Reiniciar el store (para resetear el test)
  reiniciar: () => void;
  
  // Obtener todos los juegos con puntajes registrados
  obtenerResultados: () => Juego[];
};

export const useJuegosStore = create<JuegosState>((set, get) => ({
  juegos: [],
  carreras: CARRERAS, // Inicializa con las carreras disponibles

  agregarJuego: (nombreJuego, carrerasAsociadas, puntaje = 0) =>
    set((state) => ({
      juegos: [
        ...state.juegos,
        {
          nombre: nombreJuego,
          puntaje, // Puntaje vacío inicialmente
          tiposDeCarrera: carrerasAsociadas, // Carreras vinculadas al juego
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
}));