import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConozcaClienteService {

  constructor(private http: HttpClient) { }

  // getDatosBCE01(fecha1: string, fecha2: string){
  //   return this.http.get(`${environment.apiUrl}/BCE/01/`+fecha1+`/`+fecha2); //Usar fechas para la ejecucion del procedimiento y carga al front
  // }
  getDatosRotef(fecha2: string){
    let params = new HttpParams()
      .set('usuario', 'admin')
      .set('fecha', fecha2);
    return this.http.get(`${environment.apiUrl}/rotef/generar?usuario=admin&fecha=`+fecha2+``);
  }
  
  getDatosGenXml(fecha2: string, codEntidadSRI: string){
    let params = new HttpParams()
      .set('codigo', codEntidadSRI)
      .set('usuario', 'admin')
      .set('fecha', fecha2);
    return this.http.get(`${environment.apiUrl}/rotef/xml?codigo=`+codEntidadSRI+`&usuario=admin&fecha=`+fecha2+``, { responseType: 'blob' });
  }

  getDatosGenZip(fecha2: string, codEntidadSRI: string){
    let params = new HttpParams()
      .set('codigo', codEntidadSRI)
      .set('usuario', 'admin')
      .set('fecha', fecha2);
    return this.http.get(`${environment.apiUrl}/rotef/zip?codigo=`+codEntidadSRI+`&usuario=admin&fecha=`+fecha2+``, { responseType: 'blob' });
  }

  getEmpresa(){
    return this.http.get(`${environment.apiUrl}/empresa/get`);
  }
  
}
