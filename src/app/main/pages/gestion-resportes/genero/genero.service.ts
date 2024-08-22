import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  constructor(private http: HttpClient) { }

  getEmpresa(){
    return this.http.get(`${environment.apiUrl}/empresa/get`);
  }

  loadByFecha(fecha1: string, fecha2: string){
    return this.http.get(`${environment.apiUrl}/genero/cargar/`+fecha1+`/`+fecha2);
  }
  
  generateAll(fecha1: string, fecha2: string){
    return this.http.get(`${environment.apiUrl}/genero/generar/`+fecha1+`/`+fecha2,
      { responseType: 'blob' }
    );
  }
}
