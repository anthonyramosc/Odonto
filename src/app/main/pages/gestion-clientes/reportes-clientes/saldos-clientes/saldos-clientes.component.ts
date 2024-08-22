import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from 'app/main/_services/clientes/clientes-service.service';

@Component({
  selector: 'app-saldos-clientes',
  templateUrl: './saldos-clientes.component.html',
  styleUrls: ['./saldos-clientes.component.scss']
})
export class SaldosClientesComponent implements OnInit {

  public datosSaldos: any[] = [];
  public submitted = false;

  //Busqueda
  saldosForm: FormGroup;

  // Paginación Table
  page = 1;
  itemsPerPage = 10;
  totalItems = 0; //Llenar con api

  constructor(
    private fb: FormBuilder,
    private srvCli: ClientesService
  ) {
    this.saldosForm = this.fb.group({
      numId: [''],
      //desde: [''],
      hasta: [''],
    });
  }

  ngOnInit(): void {
    // console.log(this.clienteForm.value);
    // this.srvCli.listarClientes().subscribe((resp: any) => {
    //   if (resp != null) {
    //     this.datosSaldos = resp;
    //   }
    // })

  }

  // get f() {
  //   return this.saldosForm.controls;
  // }

  onSubmit() {

    console.log('Continuar con el form valido !!');
    console.log(this.saldosForm.value);

    this.srvCli.listarClientes().subscribe((resp: any) => {
      if (resp != null) {
        this.datosSaldos = resp;
        this.totalItems = this.datosSaldos.length;
      }
    })


  }

  limpiar() {
    this.datosSaldos = [];
    this.saldosForm.reset({
      numId: '',
      //desde: '',
      hasta: '',
    });
  }

}
