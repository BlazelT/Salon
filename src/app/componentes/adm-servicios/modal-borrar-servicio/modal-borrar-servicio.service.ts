import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModalBorrarServicioService {

  constructor(private http: HttpClient) { }

  async eliminarServicio(servicio) {

    return await this.http.delete<any[]>(`https://devs-c9cdc.firebaseio.com/servicios/${servicio}.json`).toPromise();
  }

}
