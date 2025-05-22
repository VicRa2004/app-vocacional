import { CARRERAS } from "@/config/carreras";

export const PREGUNTAS_3 = [
  // Preguntas para Ingeniería Informática (CARRERAS[6])
  {
    nombre: '¿Te apasiona resolver problemas mediante el desarrollo de software?',
    resultado: 0,
    tiposDeCarrera: [CARRERAS[6]],
  },
  {
    nombre: '¿Te interesa aprender sobre inteligencia artificial o desarrollo de aplicaciones?',
    resultado: 0,
    tiposDeCarrera: [CARRERAS[6]],
  },

  // Preguntas para Administración (CARRERAS[7])
  {
    nombre: '¿Te gustaría dirigir empresas y tomar decisiones estratégicas?',
    resultado: 0,
    tiposDeCarrera: [CARRERAS[7]],
  },
  {
    nombre: '¿Te interesa el mundo de las finanzas, marketing y recursos humanos?',
    resultado: 0,
    tiposDeCarrera: [CARRERAS[7]],
  },

  // Preguntas para Ingeniería en Gestión Empresarial (CARRERAS[8])
  {
    nombre: '¿Te atrae combinar conocimientos técnicos con habilidades gerenciales?',
    resultado: 0,
    tiposDeCarrera: [CARRERAS[8]],
  },
  {
    nombre: '¿Te gustaría implementar tecnologías para mejorar procesos empresariales?',
    resultado: 0,
    tiposDeCarrera: [CARRERAS[8]],
  },

  // Preguntas transversales (afines a estas carreras)
  {
    nombre: '¿Eres bueno analizando datos para tomar decisiones?',
    resultado: 0,
    tiposDeCarrera: [CARRERAS[6], CARRERAS[7], CARRERAS[8]],
  },
  {
    nombre: '¿Disfrutas trabajando en proyectos que requieren planificación y organización?',
    resultado: 0,
    tiposDeCarrera: [CARRERAS[6], CARRERAS[7], CARRERAS[8]],
  },
];