import { CARRERAS } from "@/config/carreras";

export const PREGUNTAS_4 = [
  // Preguntas para Ingeniería en Ciencias de Datos (CARRERAS[9])
  {
    nombre: '¿Te interesa analizar grandes volúmenes de datos para extraer información valiosa?',
    resultado: 0,
    tiposDeCarrera: [CARRERAS[9]],
  },
  {
    nombre: '¿Te atrae el uso de inteligencia artificial y machine learning para resolver problemas?',
    resultado: 0,
    tiposDeCarrera: [CARRERAS[9]],
  },

  // Preguntas para Ingeniería en Sistemas Computacionales (CARRERAS[10])
  {
    nombre: '¿Te gustaría diseñar y desarrollar sistemas de software complejos?',
    resultado: 0,
    tiposDeCarrera: [CARRERAS[10]],
  },
  {
    nombre: '¿Te interesa trabajar en arquitectura de computadoras y desarrollo de sistemas?',
    resultado: 0,
    tiposDeCarrera: [CARRERAS[10]],
  },

  // Preguntas para TIC's (CARRERAS[11])
  {
    nombre: '¿Te apasiona implementar soluciones tecnológicas para comunicaciones digitales?',
    resultado: 0,
    tiposDeCarrera: [CARRERAS[11]],
  },
  {
    nombre: '¿Te gustaría desarrollar aplicaciones para redes y telecomunicaciones?',
    resultado: 0,
    tiposDeCarrera: [CARRERAS[11]],
  },

  // Preguntas transversales (afines a estas carreras tecnológicas)
  {
    nombre: '¿Eres bueno resolviendo problemas lógicos y algorítmicos?',
    resultado: 0,
    tiposDeCarrera: [CARRERAS[9], CARRERAS[10], CARRERAS[11]],
  },
  {
    nombre: '¿Disfrutas aprendiendo sobre nuevas tecnologías y lenguajes de programación?',
    resultado: 0,
    tiposDeCarrera: [CARRERAS[9], CARRERAS[10], CARRERAS[11]],
  },
];