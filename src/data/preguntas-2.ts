import { CARRERAS } from "@/config/carreras";

export const PREGUNTAS_2 = [
  // Preguntas para Ingeniería Ambiental (CARRERAS[3])
  {
    nombre:
      "¿Te preocupa la conservación del medio ambiente y la sostenibilidad?",
    resultado: 0,
    tiposDeCarrera: [CARRERAS[3]],
  },
  {
    nombre:
      "¿Te interesaría trabajar en proyectos de tratamiento de residuos o contaminación?",
    resultado: 0,
    tiposDeCarrera: [CARRERAS[3]],
  },

  // Preguntas para Ingeniería Industrial (CARRERAS[4])
  {
    nombre:
      "¿Te gustaría optimizar procesos productivos para hacerlos más eficientes?",
    resultado: 0,
    tiposDeCarrera: [CARRERAS[4]],
  },
  {
    nombre:
      "¿Te interesa mejorar la calidad y productividad en empresas manufactureras?",
    resultado: 0,
    tiposDeCarrera: [CARRERAS[4]],
  },

  // Preguntas para Ingeniería Bioquímica (CARRERAS[5])
  {
    nombre: "¿Te atrae aplicar principios químicos en procesos biológicos?",
    resultado: 0,
    tiposDeCarrera: [CARRERAS[5]],
  },
  {
    nombre:
      "¿Te gustaría desarrollar productos en industrias alimenticias o farmacéuticas?",
    resultado: 0,
    tiposDeCarrera: [CARRERAS[5]],
  },

  // Preguntas transversales (afines a estas ingenierías)
  {
    nombre:
      "¿Te interesa optimizar procesos para hacerlos más eficientes y sostenibles?",
    resultado: 0,
    tiposDeCarrera: [CARRERAS[3], CARRERAS[4], CARRERAS[5]],
  },
  {
    nombre:
      "¿Te motiva encontrar soluciones tecnológicas que mejoren el impacto ambiental o industrial?",
    resultado: 0,
    tiposDeCarrera: [CARRERAS[3], CARRERAS[4], CARRERAS[5]],
  },
];
