import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComprobantesContablesService {

  //Datos Comprobantes Contables
  private datosCmpCont: any = null;

  constructor(private http: HttpClient) { }

  listarCmp(fi: string, fc: string) {
    const params = new HttpParams()
      .set('inicio', fi)
      .set('corte', fc)
    return this.http.post(`${environment.apiUrl}/contabilidad/reporte`, params);
  }

  getCmp(fecha: string, tipoCmp:string, numCmp:string) {
    const params = new HttpParams()
      .set('fecha', fecha)
      .set('tipo', tipoCmp)
      .set('num', numCmp)
    return this.http.post(`${environment.apiUrl}/contabilidad/reporte/get`, params);
  }

  /*
    Gestionar los datos de la interfaz al navegar entre componentes
  */
  setDatos(datos: any) {
    this.datosCmpCont = datos;
  }

  getDatos() {
    return this.datosCmpCont;
  }

}
