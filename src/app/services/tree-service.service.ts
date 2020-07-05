import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DadosDoUsuario } from '../model/dadosDoUsuario';

@Injectable({
  providedIn: 'root'
})
export class TreeServiceService {

  constructor(private http: HttpClient) { }

  private url: string = "http://localhost:8080"

  public salvarDadosDoUsuario(dadosDoUsuario: DadosDoUsuario): void {
    this.http.post(`${this.url}/tree`, dadosDoUsuario)
      .toPromise()
      .then((resposta) => {
        console.log(resposta);
      })
  }

  public buscarUsuario(cpf: string): Promise<DadosDoUsuario> {
    let dadosUsuario: any = this.http.get<DadosDoUsuario>(`${this.url}/user/buscaUsuarioPeloCpf/${cpf}`)
      .toPromise()
      .then((resposta) => {
        dadosUsuario = resposta;
        return dadosUsuario;
      })
    return dadosUsuario;
  }
}
