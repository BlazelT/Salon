import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // this.sort4.direction = 'desc';
  // this.sort4.active = 'cantidadServicios';

  constructor(private http:HttpClient) { }

  async obtenerTrabajadoras(){

    return await this.http.get<any[]>('trabajadoras.json?').toPromise();
  }

async obtenerJornadas(fechaInicio,fechaTermino){

    return await this.http.get<any[]>(`jornadas.json?orderBy="$key"&startAt="${fechaInicio}"&endAt="${fechaTermino}"`).toPromise();
    
  }

}
