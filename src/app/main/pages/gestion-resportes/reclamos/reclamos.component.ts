import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { saveAs } from 'file-saver';
import { ReclamosService } from './reclamos.service';

@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.scss']
})
export class ReclamosComponent implements OnInit {

  //Datos formulario
  public reclamos: Array<any> = []

  //Datos de Empresa
  public empresa: any = []

  //Ngmodel fecha
  fechaDatos: string = null;
  fechaDatos1: string = null;
  flagGenerarI01: boolean = false;

  constructor(
    private CI01Service: ReclamosService
    ) { }

  ngOnInit(): void {
    //Get Empresa - NavBar
    this.CI01Service.getEmpresa().subscribe((resp: any) => {
      this.empresa = resp;
    })

    this.CI01Service.getAllreclamos().subscribe((resp: any) => {
      this.reclamos = resp;
    })
  }

  alertWithSuccess(){  
    if (this.fechaDatos == null) {
      Swal.fire({
        icon: 'info',
        title: 'Aviso',
        text: 'Ingrese una fecha'
      })
      this.flagGenerarI01 = true;

    } else {
      this.CI01Service.filterCI01(this.fechaDatos,this.fechaDatos1).subscribe((resp: any) => {
        this.reclamos = resp;
  
        console.log(this.reclamos)
  
        if (this.reclamos.length != 0) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Tabla Actualizada !',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Aviso',
            text: 'No hay datos recuperados!'
          })
        }
      }),
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error en recuperar los datos!'
        })
      }
    }    
  } 

  alertGenEstructuraI01(){
    if (this.fechaDatos == null) {
      Swal.fire({
        icon: 'info',
        title: 'Aviso',
        text: 'Debe generar la informacion en la tabla'
      })
    } else {
      this.CI01Service.gestEstructuraCI01(this.fechaDatos,this.fechaDatos1).subscribe((resp: any) => {
        console.log(resp);

        const blob = new Blob([resp], { type: 'application/zip' });
        var fechaTxt = this.fechaDatos1.split("-");  
        saveAs(blob, 'CI01_'+this.empresa.numRuc+'_'+fechaTxt[2]+'-'+fechaTxt[1]+'-'+fechaTxt[0]+'.zip');

        if (resp != null) {
          Swal.fire({
            icon: 'success',
            title: 'Aviso',
            text: 'Estructura CI01 Generada!'
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error respuesta de servidor!'
          })
        }


        // if (resp.status == 0) {
        //   Swal.fire({
        //     icon: 'success',
        //     title: 'Aviso',
        //     text: 'Estructura CI01 Generada!'
        //   })
        // } else {
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: 'Error respuesta de servidor!'
        //   })
        // }
      }),(error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error en generar la estructura!'
        })
      }
    }
  }

}
