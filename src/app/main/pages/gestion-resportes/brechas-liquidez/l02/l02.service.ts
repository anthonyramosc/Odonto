import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class L02Service {

  constructor(private http: HttpClient) { }

  getEmpresa(){
    return this.http.get(`${environment.apiUrl}/empresa/get`);
  }
  
  getDatosL02(fecha: string){
    return this.http.get(`${environment.apiUrl}/liquidez/listar/`+fecha);
  }

  getEstructuraL02(fecha: string){
    return this.http.get(`${environment.apiUrl}/liquidez/generar/`+fecha);
  }

}
