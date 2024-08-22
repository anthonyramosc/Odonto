import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstructuraActivoService {

  constructor(private http: HttpClient) { }


  getSaldos() {
    return this.http
        .get<any>(`${environment.apiUrl}/estructuraactivo/listar`)
        .toPromise()
        .then((res) => <any[]>res.data)
        .then((data) => {
          return data;
        });
  }
  
    getFechaBalance(){
        return this.http
            .get<any>(`${environment.apiUrl}/estructuraactivo/byfecha`)
            .toPromise()
            .then((res) => <any[]>res.data)
            .then((data) => {
                return data;
            });
    }

  getReportFile(){
    return this.http
        .get<any>(`${environment.apiUrl}/estructuraactivo/generateReport`)
        .toPromise()
        .then((res) => <any[]>res.data)
        .then((data) => {
            return data;
        });
  }

}
