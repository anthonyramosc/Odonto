import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { GeneroService } from './genero.service';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss']
})
export class GeneroComponent implements OnInit {

  //Ngmodel fecha
  fechaDatos1: string = null;
  fechaDatos2: string = null;
  flagGenerarC04: boolean = false;

  //Datos de Empresa
  public empresa: any = []

  //Datos formulario
  public dataGenero: Array<any> = []

  // Paginación Table
  page = 1;
  itemsPerPage = 15;
  totalItems = 0; //Llenar con api

  constructor(
    private IG01Serv: GeneroService
  ) { }

  ngOnInit() {
    //Get Empresa - NavBar
    this.IG01Serv.getEmpresa().subscribe((resp: any) => {
      this.empresa = resp;
    })
  }

  alertWithSuccess() {

    console.info(this.fechaDatos1)
    console.info(this.fechaDatos2)

    if (this.fechaDatos1 == null) {
      Swal.fire({
        icon: 'info',
        title: 'Aviso',
        text: 'Ingrese una fecha'
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

          this.IG01Serv.loadByFecha(this.fechaDatos1, this.fechaDatos2).subscribe((resp: any) => {
            if (resp != null) {
              this.flagGenerarC04 = true;
              this.dataGenero = resp;
              console.log(this.dataGenero)

              Swal.fire({
                icon: 'success',
                title: 'Aviso',
                text: 'Información generada!'
              })

              // Paginación Items
              this.totalItems = this.dataGenero.length;

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

  alertGenEstructuraC04() {

    if (this.flagGenerarC04) {//Genera reporte si actualiza la tabla

      if (this.fechaDatos2 == null) {
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
            this.IG01Serv.generateAll(this.fechaDatos1, this.fechaDatos2).subscribe((resp: any) => {
              if (resp != null) {

                const blob = new Blob([resp], { type: 'application/zip' });
                var fechaTxt = this.fechaDatos2.split("-");
                if (this.empresa.numRuc != 13) {
                  this.empresa.numRuc = "0" + this.empresa.numRuc;
                }
                saveAs(blob, 'IG01_' + this.empresa.numRuc + '_' + fechaTxt[2] + '-' + fechaTxt[1] + '-' + fechaTxt[0] + '.zip');

                if (resp != null) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Aviso',
                    text: 'Estructura IG01 Generada!'
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
