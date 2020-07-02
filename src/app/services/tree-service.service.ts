import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TreeServiceService {

  constructor(private http: HttpClient) { }

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
