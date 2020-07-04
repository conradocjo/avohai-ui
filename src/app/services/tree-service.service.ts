import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DadosDoUsuario } from '../model/dadosDoUsuario';

@Injectable({
  providedIn: 'root'
})
export class TreeServiceService {

  constructor(private http: HttpClient) { }

  public salvarDadosDoUsuario(dadosDoUsuario: DadosDoUsuario): void {
    console.log(dadosDoUsuario);
  }

  /*
    Serviço pra criar comunicação com backend. 
  */
  public serviceTeste(): void {
    this.http.get("http://localhost:8080/tree/teste", { responseType: 'text' }).toPromise()
      .then((teste) => {
        console.log(teste.toString())
      })
  }

}
