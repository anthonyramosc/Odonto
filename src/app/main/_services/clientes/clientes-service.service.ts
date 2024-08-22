import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  listarClientes(){
    return this.http.get(`${environment.apiUrl}/clientes`);
  }

  filtrarCliente(numId: string) {
    const params = new HttpParams()
      .set('id', numId)
    return this.http.post(`${environment.apiUrl}/clientes/filtrar`, params);
  }

  pdfListadoClientes(numId: string) {
    const params = new HttpParams()
      //.set('token', decodeURIComponent(token))
      .set('id', numId)
    return this.http.post(`${environment.apiUrl}/clientes/pdf`, params, { responseType: 'blob' });
  }

  excelListadoClientes(numId: string) {
    const params = new HttpParams()
      //.set('token', decodeURIComponent(token))
      .set('id', numId)
    return this.http.post(`${environment.apiUrl}/clientes/xls`, params, { responseType: 'blob' });
  }

  listarProveedores(){
    return this.http.get(`${environment.apiUrl}/proveedores`);
  }


}
