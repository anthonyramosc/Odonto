import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReclamosService {

  constructor(private http: HttpClient) { }

  getEmpresa(){
    return this.http.get(`${environment.apiUrl}/empresa/get`);
  }

  getAllreclamos(){
    return this.http.get(`${environment.apiUrl}/reclamos/listar`);
  }

  filterCI01(fechain:string, fecha: string){
    return this.http.get(`${environment.apiUrl}/reclamos/filtrar/`+fechain+`/`+fecha);
  }

  gestEstructuraCI01(fechain:string, fecha: string){
    return this.http.get(`${environment.apiUrl}/reclamos/generar/`+fechain+`/`+fecha, { responseType: 'blob' });
  }
}
