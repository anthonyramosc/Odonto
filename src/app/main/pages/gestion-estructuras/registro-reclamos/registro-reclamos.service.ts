import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroReclamosService {

  constructor(private http: HttpClient) { }

  getReclamos(){
    return this.http.get(`${environment.apiUrl}/reclamos/listar`);
  }

  postReclamos(body){
    return this.http.post(`${environment.apiUrl}/reclamos/crear`, body);
  }

  delReclamos(body){
    return this.http.post(`${environment.apiUrl}/reclamos/delete`, body);
  }

  updReclamos(body){
    return this.http.post(`${environment.apiUrl}/reclamos/update`, body);
  }
}
