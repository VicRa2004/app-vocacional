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
