import { CARRERAS } from "@/config/carreras";

export const PREGUNTAS_1 = [
        // Preguntas para Ingeniería Civil (CARRERAS[0])
        {
          nombre: '¿Disfrutas diseñar o construir estructuras (puentes, edificios, etc.)?',
          resultado: 0,
          tiposDeCarrera: [CARRERAS[0]], 
        },
        {
          nombre: '¿Te interesa planificar proyectos que mejoren infraestructuras urbanas?',
          resultado: 0,
          tiposDeCarrera: [CARRERAS[0]],
        },

        // Preguntas para Ingeniería Química (CARRERAS[1])
        {
          nombre: '¿Te atrae experimentar con sustancias químicas en un laboratorio?',
          resultado: 0,
          tiposDeCarrera: [CARRERAS[1]],
        },
        {
          nombre: '¿Te gustaría desarrollar nuevos materiales o productos químicos?',
          resultado: 0,
          tiposDeCarrera: [CARRERAS[1]],
        },

        // Preguntas para Ingeniería Petrolera (CARRERAS[2])
        {
          nombre: '¿Te interesa la exploración y extracción de recursos energéticos?',
          resultado: 0,
          tiposDeCarrera: [CARRERAS[2]],
        },
        {
          nombre: '¿Te gustaría trabajar en la optimización de procesos de refinación de petróleo?',
          resultado: 0,
          tiposDeCarrera: [CARRERAS[2]],
        },

        // Preguntas transversales (afines a varias ingenierías)
        {
          nombre: '¿Eres bueno resolviendo problemas matemáticos complejos?',
          resultado: 0,
          tiposDeCarrera: [CARRERAS[0], CARRERAS[1], CARRERAS[2]], 
        },
        {
          nombre: '¿Prefieres trabajar en equipo para resolver desafíos técnicos?',
          resultado: 0,
          tiposDeCarrera: [CARRERAS[0], CARRERAS[1], CARRERAS[2]],
        },
      ];