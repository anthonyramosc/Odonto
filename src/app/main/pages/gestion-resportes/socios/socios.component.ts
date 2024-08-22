import { Component, OnInit } from '@angular/core';
import { SociosService } from './socios.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { saveAs } from 'file-saver';
import { HttpHeaders } from '@angular/common/http';
import { CoreMenuService } from '@core/components/core-menu/core-menu.service';
import { CoreMenuComponent } from '@core/components/core-menu/core-menu.component';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.scss']
})
export class SociosComponent implements OnInit {

  //Empresa
  empresa: any;
  numRuc: string;

  //Session User
  dataUser: any;

  //Estructura S01
  dataSocios: any = [];
  fechaCorte: string = null;

  // Paginación Table
  page = 1;
  itemsPerPage = 15;
  totalItems = 0; //Llenar con api

  constructor(
    private s01Service: SociosService,
  ) { }

  ngOnInit(): void {
    //Get Empresa - NavBar
    this.s01Service.getEmpresa().subscribe((resp: any) => {
      if (resp != null) {
        this.empresa = resp;
        this.numRuc = this.empresa.numRuc;
      }
    })

    

  }

  generarDatosS01() {
    if (this.fechaCorte == null) {
      Swal.fire({
        icon: 'info',
        title: 'Aviso',
        text: 'Debe ingresar la fecha corte'
      })

    } else {

      let timerInterval
      Swal.fire({
        title: 'Cargando datos de estructura...',
        text: 'Espere un momento.',
        onBeforeOpen: () => {
          Swal.showLoading();
          const startTime = new Date().getTime(); // Tiempo de inicio de la solicitud


          const session = JSON.parse(localStorage.getItem('currentUser'));
          console.log('token', session.token)
          this.s01Service.getSessionUsuarioActual(session.token).subscribe((resp: any) => {
            if (resp != null) {
              this.dataUser = resp.data;
              this.s01Service.getDataS01(session.token, this.fechaCorte).subscribe((resp: any) => {
                if (resp != null) {
                  console.log('data', resp)
                  const endTime = new Date().getTime(); // Tiempo de finalización de la solicitud
                  const responseTime = endTime - startTime; // Tiempo total de la solicitud
                  this.dataSocios = resp;

                  Swal.fire({
                    icon: 'success',
                    title: 'Aviso',
                    text: 'Información generada!'
                  })

                  // Paginación Items
                  this.totalItems = this.dataSocios.length;

                  clearInterval(timerInterval);
                }
              })
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

  crearZIP() {
    if (this.dataSocios.length == 0) {//sin generar datos
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

          const session = JSON.parse(localStorage.getItem('currentUser'));
          this.s01Service.crearZipS01(session.token, this.fechaCorte).subscribe((resp: any) => {
            if (resp != null) {
              const endTime = new Date().getTime(); // Tiempo de finalización de la solicitud
              const responseTime = endTime - startTime; // Tiempo total de la solicitud
              const blob = new Blob([resp], { type: 'application/zip' });
              var fechaTxt = this.fechaCorte.split("-");

              var numeroConvertido = this.empresa.numRuc.toString();
              if (numeroConvertido.length != 13) {
                this.empresa.numRuc = "0" + this.empresa.numRuc;
              }
              saveAs(blob, 'S01_' + this.empresa.numRuc + '_' + fechaTxt[2] + '-' + fechaTxt[1] + '-' + fechaTxt[0] + '.zip');

              if (resp != null) {
                Swal.fire({
                  icon: 'success',
                  title: 'Aviso',
                  text: 'Estructura S01 Generada!'
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
  }

  crearTXT() {
    if (this.dataSocios.length == 0) {//sin generar datos
      Swal.fire({
        icon: 'info',
        title: 'Aviso',
        text: 'Debe generar la informacion para descargarla'
      })
    } else {

      let timerInterval
      Swal.fire({
        title: 'Creando archivo de texto...',
        text: 'Espere un momento.',
        onBeforeOpen: () => {
          Swal.showLoading();
          const startTime = new Date().getTime(); // Tiempo de inicio de la solicitud

          const session = JSON.parse(localStorage.getItem('currentUser'));

          this.s01Service.crearTxtS01(session.token, this.fechaCorte).subscribe((resp: any) => {
            if (resp != null) {
              const endTime = new Date().getTime(); // Tiempo de finalización de la solicitud
              const responseTime = endTime - startTime; // Tiempo total de la solicitud

              const blob = new Blob([resp], { type: 'text/plain' });
              // const blob = new Blob([new TextEncoder().encode(resp)], { type: 'text/plain;charset=utf-8' });
              var fechaTxt = this.fechaCorte.split("-");
              if (this.empresa.numRuc != 13) {
                this.empresa.numRuc = "0" + this.empresa.numRuc;
              }
              saveAs(blob, 'S01' + this.empresa.numRuc + '' + fechaTxt[2] + '' + fechaTxt[1] + '' + fechaTxt[0] + '.txt');

              if (resp != null) {
                Swal.fire({
                  icon: 'success',
                  title: 'Aviso',
                  text: 'Archivo de texto S01 generado!'
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
  }

}
