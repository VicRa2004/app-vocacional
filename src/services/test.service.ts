import { Juego, Pregunta } from "@/types/carrera";

export class AuthService {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async saveTest({id, juegos, preguntas}: {
    id: number,
    preguntas: Pregunta[],
    juegos: Juego[],
  }) {
    const response = await fetch(`${this.url}/resultados`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        preguntas,
        juegos,
      }),
    });

    const data = await response.json();

    console.log(data)

    return data;
  }
}
 