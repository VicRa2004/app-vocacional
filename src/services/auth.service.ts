type resLogin = {
    token: string;
    usuario: {
        id: number;
        nombre: string;
        correo: string;
        rol: string;
        genero: string;
        fechaNacimiento: string;
    }
}

export class AuthService {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async login(email: string, password: string) {
    const response = await fetch(`${this.url}/login`, {
        body: JSON.stringify({ email, password }),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
    });

    const data = await response.json() as resLogin;

    return data;
  }
}
