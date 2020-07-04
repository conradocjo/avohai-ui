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

  public buscarUsuario(nomeUsuario: string): Promise<DadosDoUsuario> {
    return null;
  }


}
