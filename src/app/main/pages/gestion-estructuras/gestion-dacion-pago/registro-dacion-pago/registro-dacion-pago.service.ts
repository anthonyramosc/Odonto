import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroDacionPagoService {

  constructor(private http: HttpClient) { }

  getDacionesPagos(){
    return this.http.get(`${environment.apiUrl}/dacionpago/listar`);
  }

  postDacionesPago(body){
    return this.http.post(`${environment.apiUrl}/dacionpago/crear`, body);
  }

}
