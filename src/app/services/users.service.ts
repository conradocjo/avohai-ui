import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public verificaSeUsuarioExiste(cpf: string): Promise<Boolean> {
    let dadosUsuario: any = this.http.get(`${this.url}/user/verificaSeUsuarioExiste/${cpf}`)
      .toPromise()
      .then((resposta) => {
        dadosUsuario = resposta;
        return dadosUsuario;
      })
    return dadosUsuario;
  }

}
