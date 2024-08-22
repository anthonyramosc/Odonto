import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstructuraCostosGastosService {

  
  constructor(private http: HttpClient) { }

  getSaldos() {
    return this.http
        .get<any>(`${environment.apiUrl}/estructurabalance/listar`)
        .toPromise()
        .then((res) => <any[]>res.data)
        .then((data) => {
          return data;
        });
  }
  
    getFechaBalance(){
        return this.http
            .get<any>(`${environment.apiUrl}/estructurabalance/byfecha`)
            .toPromise()
            .then((res) => <any[]>res.data)
            .then((data) => {
                return data;
            });
    }
}
