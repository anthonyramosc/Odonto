import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RegistroInversionesService } from 'app/main/pages/gestion-estructuras/gestion-inversiones/registro-inversiones/registro-inversiones.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { I01Service } from './i01.service';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-i01',
  templateUrl: './i01.component.html',
  styleUrls: ['./i01.component.scss']
})
export class I01Component implements OnInit {

  numRuc: string;
  bancos: any;

  //Habiliar estructura
  divDeshabilitado: boolean = false;

  //Datos formulario
  public inversiones: Array<any> = []

  //Datos de Empresa
  public empresa: any = []

  //Ngmodel fecha
  fechaDatosI: string = null;
  fechaDatosF: string = null;
  flagGenerarI01: boolean = false;

  // Paginación Table
  page = 1;
  itemsPerPage = 15;
  totalItems = 0; //Llenar con api

  constructor(
    private ScgI01Service: I01Service,
    private SgfInversionesService: RegistroInversionesService
  ) { }

  ngOnInit() {
    //Get Empresa - NavBar
    this.ScgI01Service.getEmpresa().subscribe((resp: any) => {
      this.empresa = resp;
      this.numRuc = this.empresa.numRuc;

      //Condicion que TIENE O NO EL SERVICIO
      // this.mostrarMensajeNoDisponible(this.empresa.nomEmpresa);
    })

    this.ScgI01Service.getInversiones().subscribe((resp: any) => {
      this.inversiones = resp;
      // Paginación Items
      this.totalItems = this.inversiones.length;
    })

    this.SgfInversionesService.getBancos().subscribe((resp: any) => {
      this.bancos = resp;
    })
  }

  mostrarMensajeNoDisponible(nomEmpresa: string) {
    Swal.fire({
      icon: 'info',
      title: 'Aviso',
      text: nomEmpresa + ' no dispone de éste servicio.',
      onClose: () => {
        this.divDeshabilitado = true; // Después de cerrar el mensaje, deshabilita el div
      },
    });
  }

  alertWithSuccess() {
    if (this.fechaDatosI == null || this.fechaDatosF == null) {
      Swal.fire({
        icon: 'info',
        title: 'Aviso',
        text: 'Debe ingresar el rango de fechas'
      })
      this.flagGenerarI01 = true;

    } else {

      let timerInterval
      Swal.fire({
        title: 'Cargando datos de estructura...',
        text: 'Espere un momento.',
        onBeforeOpen: () => {
          Swal.showLoading();
          const startTime = new Date().getTime(); // Tiempo de inicio de la solicitud
          this.ScgI01Service.getDatosI01(this.fechaDatosI, this.fechaDatosF).subscribe((resp: any) => {
            if (resp != null) {
              const endTime = new Date().getTime(); // Tiempo de finalización de la solicitud
              const responseTime = endTime - startTime; // Tiempo total de la solicitud

              this.inversiones = resp;
              // console.log(this.inversiones)
              if (this.inversiones.length != 0) {
                Swal.fire({
                  icon: 'success',
                  title: 'Completado',
                  text: 'Información generada!'
                })
              } else {
                Swal.fire({
                  icon: 'info',
                  title: 'Aviso',
                  text: 'No hay datos recuperados!\tReporte solo con cabecera'
                })
              }

              // Paginación Items
              this.totalItems = this.inversiones.length;

              clearInterval(timerInterval);
            }
          }, (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un error al cargar la información para I01.',
              icon: 'error',
            });

            clearInterval(timerInterval);
          });

        },
      });

    }
  }

  alertGenEstructuraI01() {
    if (this.fechaDatosI == null || this.fechaDatosF == null) {
      Swal.fire({
        icon: 'info',
        title: 'Aviso',
        text: 'Debe generar la informacion para descargarla'
      })
    } else {

      let timerInterval
      Swal.fire({
        title: 'Comprimiendo archivos...',
        text: 'Espere un momento.',
        onBeforeOpen: () => {
          Swal.showLoading();
          const startTime = new Date().getTime(); // Tiempo de inicio de la solicitud

          this.ScgI01Service.gestEstructuraI01(this.fechaDatosI, this.fechaDatosF).subscribe((resp: any) => {
            if (resp != null) {

              const blob = new Blob([resp], { type: 'application/zip' });
              var fechaTxt = this.fechaDatosF.split("-");
              var numeroConvertido = this.empresa.numRuc.toString();
              if (numeroConvertido.length != 13) {
                this.empresa.numRuc = "0" + this.empresa.numRuc;
              }
              saveAs(blob, 'I01_' + this.empresa.numRuc + '_' + fechaTxt[2] + '-' + fechaTxt[1] + '-' + fechaTxt[0] + '.zip');

              if (resp != null) {
                Swal.fire({
                  icon: 'success',
                  title: 'Completado',
                  text: 'Estructura I01 Generada!'
                })
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Error respuesta de servidor!'
                })
              }

              clearInterval(timerInterval);
            }
          });

        },
      });

    }
  }

  getNombreUsuarioPorId(id: number): string | undefined {
    const banco = this.bancos.find((banco) => banco.codBanco === id);
    return banco ? banco.nomBanco : "NaN";
  }
}
