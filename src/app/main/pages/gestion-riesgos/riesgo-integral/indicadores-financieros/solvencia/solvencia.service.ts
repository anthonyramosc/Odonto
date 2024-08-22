import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolvenciaService {

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
}
