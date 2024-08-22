import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class C04Service {

  constructor(private http: HttpClient) { }

  getDacionPago(){
    return this.http.get(`${environment.apiUrl}/dacionpago/listar`);
  }

  getDatosC04(fecha: string){
    return this.http.get(`${environment.apiUrl}/dacionpago/listarC04/`+fecha);
  }

  getEmpresa(){
    return this.http.get(`${environment.apiUrl}/empresa/get`);
  }

  gestEstructuraC04(fecha: string){
    return this.http.get(`${environment.apiUrl}/dacionpago/generarC04/`+fecha, { responseType: 'blob' });
  }

}
