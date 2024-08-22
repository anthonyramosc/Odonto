import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Bce01Service {

  constructor(private http: HttpClient) { }

  getDatosBCE01(fecha1: string, fecha2: string){
    return this.http.get(`${environment.apiUrl}/BCE/01/`+fecha1+`/`+fecha2); //Usar fechas para la ejecucion del procedimiento y carga al front
  }
  
  getDatosGenBCE01(fecha2: string, codEntidadBCE: string){
    return this.http.get(`${environment.apiUrl}/BCE/generar01/`+fecha2+`/`+codEntidadBCE, { responseType: 'text' });
  }

  getEmpresa(){
    return this.http.get(`${environment.apiUrl}/empresa/get`);
  }
}
