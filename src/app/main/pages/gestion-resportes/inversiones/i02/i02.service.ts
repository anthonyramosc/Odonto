import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class I02Service {

  constructor(private http: HttpClient) { }

  getInversiones(){
    return this.http.get(`${environment.apiUrl}/inversiones/listar`);
  }

  // getDatosI01(fecha: string){
  //   return this.http.get(`${environment.apiUrl}/inversiones/listarI02/`+fecha);
  // }
  getDatosI01(fechaI: string, fechaF: string){
    const params = new HttpParams()
      .set('finicio', fechaI)
      .set('fcorte', fechaF)
    return this.http.post(`${environment.apiUrl}/inversiones/listarI02`, params);
  }

  getEmpresa(){
    return this.http.get(`${environment.apiUrl}/empresa/get`);
  }

  // gestEstructuraI01(fecha: string){
  //   return this.http.get(`${environment.apiUrl}/inversiones/generarI02/`+fecha, { responseType: 'blob' });
  // }
  gestEstructuraI01(fechaI: string, fechaF: string){
    const params = new HttpParams()
      .set('finicio', fechaI)
      .set('fcorte', fechaF)
    return this.http.post(`${environment.apiUrl}/inversiones/generarI02`, params, { responseType: 'blob' });
  }

}
