import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { saveAs } from 'file-saver';
import { HttpErrorResponse } from '@angular/common/http';
import { Bce02Service } from './bce02.service';

@Component({
  selector: 'app-bce02',
  templateUrl: './bce02.component.html',
  styleUrls: ['./bce02.component.scss']
})
export class Bce02Component implements OnInit {

  //Ngmodel fecha
  fechaDatos1: string = null;
  fechaDatos2: string = null;
  flagGenerarBCE02: boolean = false;
  codEntidadBCE: string = null;

  //Datos de Empresa
  public empresa: any = []
  numRuc: string;

  //Datos formulario
  public opCredi: Array<any> = []
  
  // Paginación Table
  page = 1;
  itemsPerPage = 15;
  totalItems = 0; //Llenar con api

  constructor(
    private Bce02Serv: Bce02Service
  ) { }

  ngOnInit(): void {
    //Get Empresa - NavBar
    this.Bce02Serv.getEmpresa().subscribe((resp: any) => {
      this.empresa = resp;
      this.numRuc = this.empresa.numRuc;
    })
  }

  generarDatosBCE02() {


    console.info(this.fechaDatos1)
    console.info(this.fechaDatos2)
    console.info('Cod Entidad: ', this.codEntidadBCE)

    if (this.codEntidadBCE == null) {
      Swal.fire({
        icon: 'info',
        title: 'Aviso',
        text: 'Ingrese el código que le asigna el BCE'
      })

    } else if (this.fechaDatos2 == null) {
      Swal.fire({
        icon: 'info',
        title: 'Aviso',
        text: 'Ingrese una fecha'
      })

    } else {

      let timerInterval
      Swal.fire({
        title: 'Cargando datos de estructura...',
        text: 'Espere un momento.',
        onBeforeOpen: () => {
          Swal.showLoading();

          this.Bce02Serv.getDatosBCE01(this.fechaDatos1, this.fechaDatos2).subscribe((resp: any) => {
            if (resp != null) {
              this.flagGenerarBCE02 = true;
              this.opCredi = resp;

              console.log(this.opCredi)

              Swal.fire({
                icon: 'success',
                title: 'Aviso',
                text: 'Información generada!'
              })

              // Paginación Items
              this.totalItems = this.opCredi.length;

              clearInterval(timerInterval);
            }
          }, (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un error al cargar la información.',
              icon: 'error',
            });

            clearInterval(timerInterval);
          });

        },
      });

    }
  }


  crearTXT() {
    if (this.flagGenerarBCE02) {//Genera reporte si actualiza la tabla
      console.info('Cod Entidad: ', this.codEntidadBCE)
      if (this.codEntidadBCE == null) {
        Swal.fire({
          icon: 'info',
          title: 'Aviso',
          text: 'Ingrese el código que le asigna el BCE'
        })

      } else if (this.fechaDatos2 == null) {
        Swal.fire({
          icon: 'info',
          title: 'Aviso',
          text: 'Debe generar la informacion en la tabla'
        })
      } else {

        let timerInterval
        Swal.fire({
          title: 'Comprimiendo archivos...',
          text: 'Espere un momento.',
          onBeforeOpen: () => {
            Swal.showLoading();
            this.Bce02Serv.getDatosGenBCE01(this.fechaDatos2, this.codEntidadBCE).subscribe((resp: any) => {
              if (resp != null) {

                const blob = new Blob([resp], { type: 'text/plain' });
                var fechaTxt = this.fechaDatos2.split("-");
                saveAs(blob, 'BCE02' + this.codEntidadBCE + '' + fechaTxt[2] + '' + fechaTxt[1] + '' + fechaTxt[0] + '.txt');

                if (resp != null) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Aviso',
                    text: 'Estructura BCE02 Generada'
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
            })

          },
        });

      }
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Aviso',
        text: 'Debe generar la informacion en la tabla'
      })
    }

  }

}
