import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TotalesClientesService {

  private jornadas = new Subject<any>();
 
  constructor(private http:HttpClient) { }

  obtenerDatos() :Observable<any>{
    return this.jornadas.asObservable();
  }

obtenerJornadas(fechaInicio,fechaTermino, clientes){
    return this.http.get<any[]>(`jornadas.json?orderBy="$key"&startAt="${fechaInicio}"&endAt="${fechaTermino}"`).subscribe(jornadas=>{
this.jornadas.next({jornadas:jornadas, clientes:clientes})
    });
    
  }
}
