import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SociosService {


  constructor(private http: HttpClient) { }
  

  //Get Session ===
  getSessionUsuarioActual(token: string) {
    const params = new HttpParams()
      .set('token', decodeURIComponent(token))
    return this.http.post(`${environment.apiUrl}/login/mostrar`, params);
  }

  getDataS01(token: string, fcorte: string) {
    const params = new HttpParams()
      .set('token', decodeURIComponent(token))
      .set('fcorte', fcorte)
    return this.http.post(`${environment.apiUrl}/s01/generar`, params);
  }

  getEmpresa() {
    return this.http.get(`${environment.apiUrl}/empresa/get`);
  }

  //Editar para generar ZIP
  crearZipS01(token: string, fcorte: string) {
    const params = new HttpParams()
      .set('token', decodeURIComponent(token))
      .set('fcorte', fcorte)
    return this.http.post(`${environment.apiUrl}/s01/zip`, params, { responseType: 'blob' });
  }

  crearTxtS01(token: string, fcorte: string) {
    const params = new HttpParams()
      .set('token', decodeURIComponent(token))
      .set('fcorte', fcorte)
    return this.http.post(`${environment.apiUrl}/s01/txt`, params, { responseType: 'text' });
  }
}
