import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from 'app/main/_services/clientes/clientes-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {

  public dataClientes: any[] = [];
  public submitted = false;

  //Busqueda
  clienteForm: FormGroup;

  // Paginación Table
  page = 1;
  itemsPerPage = 10;
  totalItems = 0; //Llenar con api

  constructor(
    private fb: FormBuilder,
    private cliService: ClientesService,
    private modalService: NgbModal,
  ) {
    this.clienteForm = this.fb.group({
      numId: [''],
    });
  }

  ngOnInit(): void {

    //No recuperar al INICIO
    // this.cliService.listarClientes().subscribe((resp: any) => {
    //   if (resp != null) {
    //     this.dataClientes = resp;
    //     this.totalItems = this.dataClientes.length;
    //   }
    // })

  }

  // get f() {
  //   return this.clienteForm.controls;
  // }

  onSubmit() {
    // this.submitted = true;
    // if (this.clienteForm.invalid) {
    //   // console.log('Proporcione todos los valores requeridos.');
    //   alert('Proporcione todos los valores requeridos.');
    //   return false;
    // }

    // console.log('Continuar con el form valido !!');
    // console.log('Form:',this.clienteForm.value);
    var numid = this.clienteForm.controls.numId.value

    this.cliService.filtrarCliente(numid).subscribe((resp: any) => {
      if (resp != null) {
        this.dataClientes = resp;
        this.totalItems = this.dataClientes.length;
      }
    })
  }

  descargarExcel(){
    var numid = this.clienteForm.controls.numId.value
    this.cliService.excelListadoClientes(numid).subscribe((resp: any) => {
      if (resp != null) {

        const blob = new Blob([resp], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'Reporte Clientes.xlsx');

        if (resp != null) {
          Swal.fire({
            icon: 'success',
            title: 'Aviso',
            text: 'Lista de clientes generado!'
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error respuesta de servidor!'
          })
        }

      }
    })
  }

  descargarPdf() {
    var numid = this.clienteForm.controls.numId.value
    this.cliService.pdfListadoClientes(numid).subscribe((resp: any) => {
      if (resp != null) {

        const blob = new Blob([resp], { type: 'application/pdf' });
        saveAs(blob, 'Reporte Clientes.pdf');

        if (resp != null) {
          Swal.fire({
            icon: 'success',
            title: 'Aviso',
            text: 'Lista de clientes generado!'
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error respuesta de servidor!'
          })
        }

      }
    })
  }


limpiar(){
  this.dataClientes = [];
  this.clienteForm.reset({
    numId: ''
  });
}

modalOpenPrimary(modalPrimary) {
  this.modalService.open(modalPrimary, {
    centered: true,
    windowClass: 'modal modal-primary'
  });
}

  

}
