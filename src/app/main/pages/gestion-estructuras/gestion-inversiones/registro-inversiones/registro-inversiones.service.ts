import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroInversionesService {

  constructor(private http: HttpClient) { }

  getSaldos() {
    return this.http
        .get<any>(`${environment.apiUrl}/balance/listar`)
        .toPromise()
        .then((res) => <any[]>res.data)
        .then((data) => {
          return data;
        });
  }
  getPatrimonio() {
      return this.http
          .get<any>(`${environment.apiUrl}/balance/patrimonio`)
          .toPromise()
          .then((res) => <any[]>res.data)
          .then((data) => {
              return data;
          });
  }
  getFechaBalance(){
      return this.http
          .get<any>(`${environment.apiUrl}/balance/byfecha`)
          .toPromise()
          .then((res) => <any[]>res.data)
          .then((data) => {
              return data;
          });
  }

  getInversiones(){
    return this.http.get(`${environment.apiUrl}/inversiones/listar`);
  }

  postInversiones(body){
    return this.http.post(`${environment.apiUrl}/inversiones/crear`, body);
  }

  getBancos(){
    return this.http.get(`${environment.apiUrl}/bancos`);
  }

  updateInversiones(body){
    return this.http.post(`${environment.apiUrl}/inversiones/update`, body);
  }

  delInversiones(body){
    return this.http.post(`${environment.apiUrl}/inversiones/delete`, body);
  }

}

