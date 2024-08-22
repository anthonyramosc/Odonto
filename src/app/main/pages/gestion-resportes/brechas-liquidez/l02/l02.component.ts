import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { L02Service } from './l02.service';

@Component({
  selector: 'app-l02',
  templateUrl: './l02.component.html',
  styleUrls: ['./l02.component.scss']
})
export class L02Component implements OnInit {

  //Habiliar estructura
  divDeshabilitado: boolean = false;

  //Datos formulario
  public liquidez: Array<any> = []

  fechaDatos: string = null;
  flagGenerarL02: boolean = false;

  //Datos de Empresa
  public empresa: any = []

  constructor(
    public L02Service: L02Service
  ) { }

  ngOnInit() {

    //Get Empresa - NavBar
    this.L02Service.getEmpresa().subscribe((resp: any) => {
      this.empresa = resp;

      
      //Condicion que TIENE O NO EL SERVICIO
      this.mostrarMensajeNoDisponible(this.empresa.nomEmpresa);
    })

    //falta un servicio mas de obtener sin fecha todos !!
  }

  mostrarMensajeNoDisponible(nomEmpresa: string) {
    Swal.fire({
      icon: 'info',
      title: 'Aviso',
      text: nomEmpresa+' no dispone de éste servicio.',
      onClose: () => {
        this.divDeshabilitado = true; // Después de cerrar el mensaje, deshabilita el div
      },
    });
  }

  alertWithSuccess(){  
    if (this.fechaDatos == null) {
      Swal.fire({
        icon: 'info',
        title: 'Aviso',
        text: 'Ingrese una fecha'
      })
      this.flagGenerarL02 = true;

    } else {
      this.L02Service.getDatosL02(this.fechaDatos).subscribe((resp: any) => {
        this.liquidez = resp;
  
        console.log(this.liquidez)
  
        if (this.liquidez.length != 0) {
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

  alertGenEstructuraC04(){
    if (this.fechaDatos == null) {
      Swal.fire({
        icon: 'info',
        title: 'Aviso',
        text: 'Debe generar la informacion en la tabla'
      })
    } else {
      this.L02Service.getEstructuraL02(this.fechaDatos).subscribe((resp: any) => {
        console.log(resp);
        if (resp.status == 0) {
          Swal.fire({
            icon: 'success',
            title: 'Aviso',
            text: 'Estrcutura C04 Generada!'
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error respuesta de servidor!'
          })
        }
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
