import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from 'app/main/_model/paciente/paciente';
import { ANAMNESIS_GENERAL } from 'app/main/_util/pacientes/pacientes';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-anamnesis-general',
  templateUrl: './anamnesis-general.component.html',
  styleUrls: ['./anamnesis-general.component.scss']
})
export class AnamnesisGeneralComponent implements OnInit {

  datosPacienteSession: Paciente;

  //Forms
  formAnamnesisGeneral: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder
  ) {
    //Validar Formulario
    this.formAnamnesisGeneral = this.fb.group({
      motCons: ['', Validators.required],
      antcMed: [''],
      medicam: [''],
      habitos: [''],
      antFami: [''],
      peso: [''],
      talla: [''],
      imc: [''],
    });
  }

  ngOnInit(): void {

    const storedPaciente = sessionStorage.getItem('datosPaciente');
    if (storedPaciente) {
      this.datosPacienteSession = JSON.parse(storedPaciente);
      // console.log('Uso de sessionStore')
      // console.log('Paciente selec:', this.datos)

      //Get anamnesis/lista de anamnesis del paciente con la sesion
      if (ANAMNESIS_GENERAL.length !=0) {
        const anamnesis = ANAMNESIS_GENERAL.filter(anam => 
          anam.id.codEmpresa == this.datosPacienteSession.id.codEmpresa && 
          anam.id.codAnamnesis == 1 && 
          anam.id.codPaciente == this.datosPacienteSession.id.codPaciente
        )[0]; //primero del paciente
  
        if (anamnesis) {
          this.formAnamnesisGeneral.patchValue({
            motCons: anamnesis.txtMotConsulta,
            antcMed: anamnesis.txtAntMedicos,
            medicam: anamnesis.txtMedicamentos,
            habitos: anamnesis.txtHabitos,
            antFami: anamnesis.txtAntFamiliares,
            peso: anamnesis.numPeso,
            talla: anamnesis.numTalla,
            imc: anamnesis.numImc,
          });
        } else {
          console.log('nuevo anamnesis')
        }
        
      }
      
    }

  }

  get f() { return this.formAnamnesisGeneral.controls; }

  onSubmit(){
    this.submitted = true;
    if (this.formAnamnesisGeneral.invalid) {
      return;
    }
    // console.log(this.formAnamnesisGeneral.value) //muestra contenido de form completo

    //Save con backend - Datos de Paciente

    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: "success",
      title: "Datos almacenados"
    });
  }

}
