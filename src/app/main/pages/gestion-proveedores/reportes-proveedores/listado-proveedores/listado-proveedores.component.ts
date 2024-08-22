import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from 'app/main/_services/clientes/clientes-service.service';

@Component({
  selector: 'app-listado-proveedores',
  templateUrl: './listado-proveedores.component.html',
  styleUrls: ['./listado-proveedores.component.scss']
})
export class ListadoProveedoresComponent implements OnInit {

  public datosProveedores: any[] = [];
  public submitted = false;

  //Busqueda
  proveedorForm: FormGroup;

  // Paginación Table
  page = 1;
  itemsPerPage = 10;
  totalItems = 0; //Llenar con api

  constructor(
    private fb: FormBuilder,
    private cliServ: ClientesService

  ) { 
    this.proveedorForm = this.fb.group({
      numId: [''],
    });
  }

  ngOnInit(): void {
    // console.log(this.proveedorForm.value);
    // this.cliServ.listarProveedores().subscribe((resp: any) => {
    //   if (resp!=null) {
    //     this.datosProveedores = resp
    //     this.totalItems = this.datosProveedores.length;
    //   }
    // })

  }

  // get f() {
  //   return this.proveedorForm.controls;
  // }

  onSubmit(){

    // console.log('Continuar con el form valido !!');
    // console.log(this.proveedorForm.value);

    this.cliServ.listarProveedores().subscribe((resp: any) => {
      if (resp!=null) {
        this.datosProveedores = resp
        this.totalItems = this.datosProveedores.length;
      }
    })
  }

  limpiar(){
    this.datosProveedores = [];
    this.proveedorForm.reset({
      numId: ''
    });
  }

}
