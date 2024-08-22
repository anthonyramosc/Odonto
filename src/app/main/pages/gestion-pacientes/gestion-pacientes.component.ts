import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from 'app/main/_model/paciente/paciente';
import { PacientesService } from 'app/main/_services/pacientes/pacientes.service';
import { PACIENTES } from 'app/main/_util/pacientes/pacientes';

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-pacientes',
  templateUrl: './gestion-pacientes.component.html',
  styleUrls: ['./gestion-pacientes.component.scss']
})
export class GestionPacientesComponent implements OnInit {

  cedulasExistentes: string[] = [];

  contador = 2;//Contador de cod pacientes
  datos: any; // Datos de componente lista pacientes

  //Forms
  formDatosPaciente: FormGroup;
  submitted = false;

  // listaPacientes: Paciente[] = PACIENTES;

  constructor(
    private _pacientesSrv: PacientesService,
    private fb: FormBuilder
  ) {
    //Validar Formulario
    this.formDatosPaciente = this.fb.group({
      nomP: ['', Validators.required],
      apeP: ['', Validators.required],
      numIdP: ['', Validators.required],
      //Agregar mas campos
    });
  }

  ngOnInit() {

    for (let i = 0; i < PACIENTES.length; i++) {
      this.cedulasExistentes.push(PACIENTES[i].numIdPaciente);
    }
    console.log('Cedulas existentes:', this.cedulasExistentes)

    //Datos paciente en storage
    const storedPaciente = sessionStorage.getItem('datosPaciente');
    if (storedPaciente) {
      this.datos = JSON.parse(storedPaciente);
      this.formDatosPaciente.patchValue({
        nomP: this.datos.nomPaciente,
        apeP: this.datos.apePaciente,
        numIdP: this.datos.numIdPaciente,
        //Agregar mas campos
      });
    }

  }

  // convenience getter for easy access to form fields
  get f() { return this.formDatosPaciente.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.formDatosPaciente.invalid) {
      return;
    }
    // console.log(this.formDatosPaciente.value) //muestra contenido de form completo

    //Save con backend - Datos de Paciente
    if (this.datos) {
      this.actualizarPaciente(this.datos);
    } else {
      this.crearPaciente();
    }
    console.log('Lista Pacientes:', PACIENTES)

  }

  crearPaciente() {
    console.log('nuevo')
    // const numIdControl = this.formularioPaciente.get('numIdPaciente');
    this.formDatosPaciente.get('numIdP').setValidators([
      Validators.required,
      this.cedulaExisteValidator()
    ]);
    this.formDatosPaciente.get('numIdP').updateValueAndValidity();

    this.submitted = true;
    if (this.formDatosPaciente.invalid) {
      return;
    }

    this.contador++;
    const nuevoPaciente = {
      id: {
        codEmpresa: 1,
        codPaciente: this.contador,
      },
      codFichaPaciente: 1000 + this.contador,
      numIdPaciente: this.formDatosPaciente.controls.numIdP.value,
      nomPaciente: this.formDatosPaciente.controls.nomP.value,
      apePaciente: this.formDatosPaciente.controls.apeP.value,
      mailPaciente: 'mail@gmail.com',
      fecNacPaciente: '1999-01-01',
      stsPaciente: 'A',
      dirPaciente: 'Sur de la ciudad',
      telCelular: '0987654321',
    }
    PACIENTES.push(nuevoPaciente);
    sessionStorage.setItem('datosPaciente', JSON.stringify(nuevoPaciente));
    this.cedulasExistentes.push(this.formDatosPaciente.controls.numIdP.value); //Add a cedulas existentes
    this.mensaje('paciente', 'creado');
  }

  actualizarPaciente(paciente: Paciente) {
    console.log('actualiza')
    const pacienteUpdate = {
      id: {
        codEmpresa: paciente.id.codEmpresa,
        codPaciente: paciente.id.codPaciente,
      },
      codFichaPaciente: paciente.codFichaPaciente,
      numIdPaciente: this.formDatosPaciente.controls.numIdP.value,
      nomPaciente: this.formDatosPaciente.controls.nomP.value,
      apePaciente: this.formDatosPaciente.controls.apeP.value,
      mailPaciente: 'mail@gmail.com',
      fecNacPaciente: '1999-01-01',
      stsPaciente: 'A',
      dirPaciente: 'Sur de la ciudad',
      telCelular: '0987654321',
    }

    const indice = PACIENTES.findIndex(p =>
      p.id.codPaciente === pacienteUpdate.id.codPaciente
    );
    if (indice !== -1) {
      PACIENTES[indice] = pacienteUpdate;
    }
    this.mensaje('paciente', 'actualizado');
  }

  //Validar cuando sea nuevo
  cedulaExisteValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cedula = control.value;
      if (this.cedulasExistentes.includes(cedula)) {
        return { cedulaExiste: true }; // Retorna un error si la cédula ya existe
      }
      return null; // Retorna null si la validación es exitosa
    };
  }

  mensaje(texto: string, accion: string){
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: "success",
      title: "Datos "+texto+" "+accion
    });
  }



}
