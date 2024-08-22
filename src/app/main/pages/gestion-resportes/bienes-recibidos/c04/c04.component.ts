import { Component, OnInit } from '@angular/core';
import { C04Service } from './c04.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-c04',
  templateUrl: './c04.component.html',
  styleUrls: ['./c04.component.scss']
})
export class C04Component implements OnInit {

  //Habiliar estructura
  divDeshabilitado: boolean = false;

  //Datos formulario
  public dacionespago: Array<any> = []

  //Ngmodel fecha
  fechaDatos: string = null;

  //Datos de Empresa
  public empresa: any = []
  nomEmpresa: string;
  numRuc: string;

  // Paginación Table
  page = 1;
  itemsPerPage = 15;
  totalItems = 0; //Llenar con api

  constructor(
    private C04Service: C04Service
  ) { }

  ngOnInit() {

    //Get Empresa - NavBar
    this.C04Service.getEmpresa().subscribe((resp: any) => {
      this.empresa = resp;
      this.numRuc = this.empresa.numRuc;
    })

    //Get all dacionpagos
    this.C04Service.getDacionPago().subscribe((resp: any) => {
      this.dacionespago = resp;
    })

    if (this.empresa!=null) {
    }
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

  generarDatosC04(){  
    if (this.fechaDatos == null) {
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

          this.C04Service.getDatosC04(this.fechaDatos).subscribe((resp: any) => {
            if (resp != null) {
              this.dacionespago = resp;

              Swal.fire({
                icon: 'success',
                title: 'Aviso',
                text: 'Información generada!'
              })

              // Paginación Items
              this.totalItems = this.dacionespago.length;

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

  crearZIP(){
    if (this.fechaDatos == null) {
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
          this.C04Service.gestEstructuraC04(this.fechaDatos).subscribe((resp: any) => {
            if (resp != null) {
              
              const blob = new Blob([resp], { type: 'application/zip' });
              var fechaTxt = this.fechaDatos.split("-");

              var numeroConvertido = this.empresa.numRuc.toString();
              if (numeroConvertido.length != 13) {
                this.empresa.numRuc = "0" + this.empresa.numRuc;
              }
              saveAs(blob, 'C04_' + this.empresa.numRuc + '_' + fechaTxt[2] + '-' + fechaTxt[1] + '-' + fechaTxt[0] + '.zip');

              if (resp != null) {
                Swal.fire({
                  icon: 'success',
                  title: 'Aviso',
                  text: 'Estructura C04 Generada'
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
