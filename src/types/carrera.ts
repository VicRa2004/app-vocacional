// types.ts
export type Carrera = {
  id: number;
  nombre: string;
};

export type Pregunta = {
  nombre: string;
  resultado: number;
  tiposDeCarrera: Carrera[];
};

export type Juego = {
  nombre: string;
  puntaje: number;
  tiposDeCarrera: Carrera[];
};
