import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComprobantesContablesService } from 'app/main/_services/contabilidad/comprobantes-contables.service';

@Component({
  selector: 'app-editar-comprobante',
  templateUrl: './editar-comprobante.component.html',
  styleUrls: ['./editar-comprobante.component.scss']
})
export class EditarComprobanteComponent implements OnInit {

  public datosComprobantes: any[] = [];

  formEditCmp: FormGroup

  datos: any; // Datos de componente padre

  // Paginación Table
  page = 1;
  itemsPerPage = 10;
  totalItems = 0; //Llenar con api

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _servCmp: ComprobantesContablesService
  ) { 
    this.formEditCmp = this.fb.group({
      fecha: [''],
      tipoCmp: [{value:'', disabled: true}],
      numCmp: [{value:'', disabled: true}],
    });
  }

  ngOnInit() {

    //Get daots de Padre usando: state
    this.datos = history.state.datosCmp;
    if (this.datos == null) {
      console.log('Datos en blanco de hijo')
    } else {
      this.formEditCmp.patchValue({
        fecha: this.datos.id.fecCmp,
        tipoCmp: this.datos.id.codTipoCmp,
        numCmp: this.datos.id.numCmp,
      });
      this._servCmp.getCmp(this.datos.id.fecCmp, this.datos.id.codTipoCmp, this.datos.id.numCmp).subscribe((resp:any) => {
        if (resp.length == 0) {
          console.log('No existen registros')
        }
        if (resp != null) {
          this.datosComprobantes = resp;
          this.totalItems = this.datosComprobantes.length;
        }
      })

    }

    
    
  }

  onSubmit(){

  }

}
