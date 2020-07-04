import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DadosDoUsuario } from '../model/dadosDoUsuario';

@Injectable({
  providedIn: 'root'
})
export class TreeServiceService {

  constructor(private http: HttpClient) { }

  private url: string = "http://localhost:8080/tree"

  public salvarDadosDoUsuario(dadosDoUsuario: DadosDoUsuario): void {
    debugger
    this.http.post(this.url, dadosDoUsuario)
      .toPromise()
      .then((resposta) => {
        console.log(resposta);
      })
  }


  public buscarUsuario(nomeUsuario: string): Promise<DadosDoUsuario> {
    return null;
  }


}
