import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DadosDoUsuario } from '../model/dadosDoUsuario';
import { pre_prod } from '../utils/links';

@Injectable({
  providedIn: 'root'
})
export class TreeServiceService {

  constructor(private http: HttpClient) { }



  public salvarDadosDoUsuario(dadosDoUsuario: DadosDoUsuario): void {
    this.http.post(`${pre_prod}/tree`, dadosDoUsuario)
      .toPromise()
      .then((resposta) => {
        console.log(resposta);
      })
  }

  public buscarUsuario(cpf: string): Promise<DadosDoUsuario> {
    let dadosUsuario: any = this.http.get<DadosDoUsuario>(`${pre_prod}/user/buscaUsuarioPeloCpf/${cpf}`)
      .toPromise()
      .then((resposta) => {
        dadosUsuario = resposta;
        return dadosUsuario;
      })
    return dadosUsuario;
  }
}
