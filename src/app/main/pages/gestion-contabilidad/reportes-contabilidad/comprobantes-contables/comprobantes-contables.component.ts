import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComprobantesContablesService } from 'app/main/_services/contabilidad/comprobantes-contables.service';

import Swal from 'sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-comprobantes-contables',
  templateUrl: './comprobantes-contables.component.html',
  styleUrls: ['./comprobantes-contables.component.scss']
})
export class ComprobantesContablesComponent implements OnInit {

  public datosComprobantes: any[] = [];
  public submitted = false;

  //Busqueda
  comprobanteForm: FormGroup;

  // Paginación Table
  page = 1;
  itemsPerPage = 10;
  totalItems = 0; //Llenar con api

  constructor(
    private fb: FormBuilder,
    private _servCmp: ComprobantesContablesService,
    private router: Router
  ) {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().substring(0, 10);
    this.comprobanteForm = this.fb.group({
      numId: [''],
      desde: [formattedDate],
      hasta: [formattedDate],
    });
  }

  ngOnInit(): void {

    //Datos de formulario y resultado
    const datos = this._servCmp.getDatos();
    if (datos != null) {
      this.comprobanteForm.patchValue({
        numId: datos.numId,
        desde: datos.fechaInicio,
        hasta: datos.fechaFin,
      });
      this.datosComprobantes = datos.datosComprobantes;
      this.totalItems = datos.totalItems;
    }

  }

  // get f() {
  //   return this.comprobanteForm.controls;
  // }

  onSubmit() {

    var desde = this.comprobanteForm.controls.desde.value;
    var hasta = this.comprobanteForm.controls.hasta.value

    this._servCmp.listarCmp(desde, hasta).subscribe((resp: any) => {
      if (resp.length == 0) {
        alert('No existen registros')
      }
      if (resp != null) {
        this.datosComprobantes = resp;
        this.totalItems = this.datosComprobantes.length;

        //Datos de formulario y resultado
        const datos = {
          numId: this.comprobanteForm.controls.numId.value,
          fechaInicio: desde,
          fechaFin: hasta,
          datosComprobantes: this.datosComprobantes,
          totalItems: this.totalItems
        };
        this._servCmp.setDatos(datos)
      }
    })

  }

  //Envia datos a hijo
  verDetalle(registro: any) {
    this.router.navigate(['/contabilidad/reportes/comprobantes/editar'], {
      state: {
        datosCmp: registro
      }
    });
  }

  limpiar() {
    this.datosComprobantes = [];
    this.comprobanteForm.reset({
      numId: ''
    });
  }

}
