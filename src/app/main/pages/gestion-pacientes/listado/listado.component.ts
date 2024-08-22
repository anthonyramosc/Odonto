import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from 'app/main/_model/paciente/paciente';
import { PacientesService } from 'app/main/_services/pacientes/pacientes.service';
import { PACIENTES } from 'app/main/_util/pacientes/pacientes';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  //Todos los pacientes de una Empresa
  listaPacientes: Paciente[] = PACIENTES;

  // Paginación Table
  page = 1;
  itemsPerPage = 10;
  totalItems = 0; //Llenar con api

  constructor(
    private _router: Router,
    private _pacientesSrv: PacientesService
  ) { }

  ngOnInit(): void {
    this.totalItems = this.listaPacientes.length;
  }

  //Envia registro de paciente a componente ficha
  verDetalle(registro: Paciente) {
    sessionStorage.setItem('datosPaciente', JSON.stringify(registro));
    this._router.navigate(['/pacientes/ficha']);
    // this._router.navigate(['/pacientes/ficha'], {
    //   state: {
    //     datosPaciente: registro
    //   }
    // });
  }

  crearPaciente(){
    sessionStorage.removeItem('datosPaciente');
    this._router.navigate(['/pacientes/ficha']);
  }

}
