import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OficinaService {

  constructor(private http: HttpClient) {
  }
  listarOficina() {
    return this.http
        .get<any>(`${environment.apiUrl}/oficina/get`)
        .toPromise()
        .then((res) => <any[]>res.data)
        .then((data) => {
          return data;
        });
  }
}
