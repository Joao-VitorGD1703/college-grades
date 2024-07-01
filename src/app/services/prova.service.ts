import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prova } from '../components/interfaces/Prova';


@Injectable({
  providedIn: 'root'
})
export class ProvaService {
  private apiUrl = 'http://localhost:3000/provas'; //URL da API


  constructor(private http: HttpClient) { }

  provas: Prova[]=[];

  list(): Observable<Prova[]>{
    return this.http.get<Prova[]>(this.apiUrl) as Observable<Prova[]>
  };

  getById(id:string):Observable<Prova>{
    return this.http.get(`${this.apiUrl}/${id}`) as Observable<Prova>
  };

  listClass(id:string):Observable<Prova[]>{
    return this.http.get<Prova[]>(`${this.apiUrl}/${id}`) as Observable<Prova[]>
  };

  remover(id:string){
    return this.http.delete(`${this.apiUrl}/${id}`)
  };
  httpHeader =  {
    headers:{
      "Content-Type":"application/json"
    }
  };

  atualizar(prova:Prova){
    return this.http.put(`${this.apiUrl}/${prova.id}`, prova, this.httpHeader);
  }

  adicionar(prova:Prova){
    return this.http.post(this.apiUrl, prova, this.httpHeader)
  }


}
