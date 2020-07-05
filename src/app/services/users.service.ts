import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pre_prod } from '../utils/links';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public verificaSeUsuarioExiste(cpf: string): Promise<Boolean> {
    let dadosUsuario: any = this.http.get(`${pre_prod}/user/verificaSeUsuarioExiste/${cpf}`)
      .toPromise()
      .then((resposta) => {
        dadosUsuario = resposta;
        return dadosUsuario;
      })
    return dadosUsuario;
  }

}
