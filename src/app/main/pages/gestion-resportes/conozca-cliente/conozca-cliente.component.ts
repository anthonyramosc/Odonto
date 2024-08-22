import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ConozcaClienteService } from './conozca-cliente.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-conozca-cliente',
  templateUrl: './conozca-cliente.component.html',
  styleUrls: ['./conozca-cliente.component.scss']
})
export class ConozcaClienteComponent implements OnInit {

  //Ngmodel fecha
  fechaDatos1: string = null;
  fechaDatos2: string = null;
  flagGenerarRotef: boolean = false;
  codEntidadBCE: string = null;

  //Datos de Empresa
  public empresa: any = []
  numRuc: string;

  //Datos formulario
  public datosRotef_aho: Array<any> = []

  constructor(
    private service: ConozcaClienteService
  ) { }

  ngOnInit(): void {

    //Get Empresa - NavBar
    this.service.getEmpresa().subscribe((resp: any) => {
      this.empresa = resp;
      this.numRuc = this.empresa.numRuc;
    })

  }

  generarDatosRotef() {

    // console.info(this.fechaDatos1)
    console.info(this.fechaDatos2)
    console.info('Cod Entidad: ', this.codEntidadBCE)

    if (this.codEntidadBCE == null) {
      Swal.fire({
        icon: 'info',
        title: 'Aviso',
        text: 'Ingrese el código que le asigna el SRI'
      })

    } else if (this.fechaDatos2 == null) {
      Swal.fire({
        icon: 'info',
        title: 'Aviso',
        text: 'Ingrese una fecha corte'
      })

    } else {

      let timerInterval
      Swal.fire({
        title: 'Cargando datos de anexo...',
        text: 'Espere un momento.',
        onBeforeOpen: () => {
          Swal.showLoading();

          this.service.getDatosRotef( this.fechaDatos2).subscribe((resp: any) => {

            if (resp != null) {
              this.flagGenerarRotef = true;
              this.datosRotef_aho = resp;

              console.log('Rotef ahorros:',this.datosRotef_aho);

              Swal.fire({
                icon: 'success',
                title: 'Aviso',
                text: 'Información generada!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    icon: 'warning',
                    title: 'Importante',
                    text: 'Genere estructura C02 en Core Financiero'
                  })
                }
              });

             

              // Paginación Items
              // this.totalItems = this.datosRotef_aho.length;

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

  crearXML() {
    if (this.flagGenerarRotef) {//Genera reporte si actualiza la tabla

      console.info('Cod Entidad: ', this.codEntidadBCE)
      if (this.codEntidadBCE == null) {
        Swal.fire({
          icon: 'info',
          title: 'Aviso',
          text: 'Ingrese el código que le asigna el SRI'
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

            this.service.getDatosGenXml(this.fechaDatos2, this.codEntidadBCE).subscribe((resp: any) => {

              if (resp != null) {

                const fecha = new Date(this.fechaDatos2);
                let mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
                const blob = new Blob([resp], { type: 'text/xml' });
                saveAs(blob, 'ROTEF' + fecha.getFullYear()+ '' + mes + '.xml');

                if (resp != null) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Aviso',
                    text: 'Estructura ROTEF Generada'
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
        text: 'Debe generar la informacion'
      })
    }

  }

  crearZIP() {
    if (this.flagGenerarRotef) {//Genera reporte si actualiza la tabla

      console.info('Cod Entidad: ', this.codEntidadBCE)
      if (this.codEntidadBCE == null) {
        Swal.fire({
          icon: 'info',
          title: 'Aviso',
          text: 'Ingrese el código que le asigna el SRI'
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

            this.service.getDatosGenZip(this.fechaDatos2, this.codEntidadBCE).subscribe((resp: any) => {
              if (resp != null) {

                const fecha = new Date(this.fechaDatos2);
                let mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
                const blob = new Blob([resp], { type: 'application/zip' });
                saveAs(blob, 'ROTEF' + fecha.getFullYear()+ '' + mes + '.zip');

                if (resp != null) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Aviso',
                    text: 'Estructura ROTEF Generada'
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
        text: 'Debe generar la informacion'
      })
    }

  }

  // crearPDF() {

  //   //test NO work: 12048
  //   //test work: 40
  //   if (this.codSocio != null) {//Genera reporte si actualiza la tabla

  //     let timerInterval
  //     Swal.fire({
  //       title: 'Generando archivo...',
  //       text: 'Espere un momento.',
  //       onBeforeOpen: () => {
  //         Swal.showLoading();
  //         this.service.generarPdf(this.codSocio).subscribe((resp: any) => {
  //           if (resp != null && resp.byteLength != 0) {

  //             const pdfBlob = new Blob([resp], { type: 'application/pdf' });
  //             saveAs(pdfBlob, 'FORMULARIO_' + this.codSocio+ '.pdf');

  //             Swal.fire({
  //               icon: 'success',
  //               title: 'Correcto',
  //               text: 'Formulario generado'
  //             })

  //             clearInterval(timerInterval);
  //           } else {
  //             Swal.fire({
  //               icon: 'error',
  //               title: 'Error',
  //               text: 'Formulario no generado, revisar información de socio. Detalle en el servidor'
  //             })

  //             clearInterval(timerInterval);
  //           }
  //         })

  //       },
  //     });
  //   } else {
  //     Swal.fire({
  //       icon: 'info',
  //       title: 'Aviso',
  //       text: 'Debe ingresar un codigo de socio'
  //     })
  //   }

  // }

}
