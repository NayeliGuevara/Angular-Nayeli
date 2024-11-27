import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { Flore, FloresAll } from "../interface/flor";


  @Injectable({
    providedIn: 'root'
  })
  export class FlorService {  
    urlFlor: string = 'http://localhost:4000/api/flor';  
  
    constructor(private http: HttpClient) { }
  
  
    getAllFlores(): Observable<FloresAll> {  
      return this.http.get<FloresAll>(`${this.urlFlor}`);
    }
  
    
    postFlor(nuevaFlor: Flore): Observable<Flore> {  
      return this.http.post<Flore>(`${this.urlFlor}`, nuevaFlor);
    }
  
  
    putFlor(id: string, marca: Flore): Observable<Flore> {
      return this.http.put<Flore>(`${this.urlFlor}/${id}`, marca);
    }
  
  
    deleteFlor(id: string) {
      return this.http.delete(`${this.urlFlor}/${id}`);
    }
  }
  