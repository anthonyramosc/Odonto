import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PrestacionPaciente } from 'app/main/_model/prestacion-paciente/prestacion-paciente';
import { Categoria } from 'app/main/_model/prestacion/categoria';
import { Prestacion } from 'app/main/_model/prestacion/prestacion';
import { COLORCODES, STSDIENTES } from 'app/main/_util/dientes/estados';
import { STSDIENTESIMG } from 'app/main/_util/dientes/estadosImg';
import { INFERIORADULTO } from 'app/main/_util/dientes/InferiorAdulto';
import { INFERIORMENOR } from 'app/main/_util/dientes/InferiorMenor';
import { SUPERIORADULTO } from 'app/main/_util/dientes/SuperiorAdulto';
import { SUPERIORMENOR } from 'app/main/_util/dientes/SuperiorMenor';

import { SelectItem, PrimeNGConfig } from "primeng/api";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html',
  styleUrls: ['./tratamientos.component.scss']
})
export class TratamientosComponent implements OnInit {

  //Formulario
  formTratamiento: FormGroup;
  submitted = false;

  // Paginación Table
  page = 1;
  itemsPerPage = 10;
  totalItems = 0; //Llenar con api

  categorias: Categoria[] = [
    {
      codCategoria: 1,
      nomCategoria: 'Restauraciones'
    },
  ];
  prestaciones: Prestacion[] = [
    {
      codPrestacion: 1,
      nomPrestacion: 'Restauracion simple',
      valPrestacion: 15.00
    },
    {
      codPrestacion: 2,
      nomPrestacion: 'Prestacion 2',
      valPrestacion: 20.00
    },
    {
      codPrestacion: 3,
      nomPrestacion: 'Prestacion 3',
      valPrestacion: 25.00
    },
  ];

  prestacionesPaciente: PrestacionPaciente[] = []
  listaPrestacionesPaciente: any[] = []

  /**
   * ===============================================================================================================================================
   * Estado de dientes: Vista transversal
   * ===============================================================================================================================================
   */
  selectedColor: string = 'lightgray'; // Color por defecto

  supAdulto = SUPERIORADULTO;
  codDientesSupAdulto = [];
  supMenor = SUPERIORMENOR;
  codDientesSupMenor = [];
  infAdulto = INFERIORADULTO;
  codDientesInfAdulto = [];
  infMenor = INFERIORMENOR;
  codDientesInfMenor = [];

  stsDientes = STSDIENTES;
  colorCodes = COLORCODES;

  /**
   * ===============================================================================================================================================
   * Estado de dientes: Vista frontal (imagenes)
   * ===============================================================================================================================================
   */
  selectedOverlay: string = ''; // Imagen superpuesta seleccionada
  isOverlayVisible: boolean = false; // Controla la visibilidad de la imagen superpuesta
  stateOverlays = STSDIENTESIMG;

  //MultiSelect
  // selectedCities: string[] = [];
  cities: any[];

  constructor(
    private fb: FormBuilder,
    private primengConfig: PrimeNGConfig
  ) {
    //Validar Formulario
    this.formTratamiento = this.fb.group({
      prest: [''],
      selectedCities: [[]]
    });

    //TestNGSelect
    this.cities = [
      { name: "Cervical", code: "1" },
      { name: "Distal", code: "2" },
      { name: "Incisal", code: "3" },
      { name: "Lingual", code: "4" },
      { name: "Mesial", code: "5" },
      { name: "Oclusal", code: "6" },
      { name: "Palatino", code: "7" },
      { name: "Vestibular", code: "8" },
      { name: "Raiz", code: "9" },
      { name: "Corona", code: "10" },
    ];
  }


  get f() { return this.formTratamiento.controls; }

  /**
   * ===============================================================================================================================================
   * Gestion de Estados Vista inferior
   * ===============================================================================================================================================
   */
  selectColor(color: string) {
    this.selectedColor = color;
  }
  changeStateColor(toothId: string, stateId: string) {
    this.stsDientes[toothId][stateId] = this.selectedColor;
  }

  getStateColorsWithCodes() {
    const stateColorsWithCodes: { [key: string]: { [key: string]: string } } = {};
    for (const tooth in this.stsDientes) {
      stateColorsWithCodes[tooth] = {};
      for (const state in this.stsDientes[tooth]) {
        stateColorsWithCodes[tooth][state] = this.colorCodes[this.stsDientes[tooth][state]];
      }
    }
    return stateColorsWithCodes;
  }

  /**
   * ===============================================================================================================================================
   * Gestion de IMAGENES
   * ===============================================================================================================================================
   */
  selectOverlay(overlay: string) {
    this.selectedOverlay = overlay;
  }

  //NOTA: Ver condiciones con respecto a: Pieza ausente, Extraccion indicada
  placeOverlayImage(toothId: string) {

    //Cambia estados de IMG sobre el diente
    if (this.selectedOverlay && this.selectedOverlay !== 'none') {
      if (!this.stateOverlays[toothId]) {
        this.stateOverlays[toothId] = [];
      }

      if (!this.stateOverlays[toothId].includes(this.selectedOverlay)) {

        //ADD lista con grupo de dientes no permite acetato
        if (this.selectedOverlay === 'coronaacetato' && toothId === 'd18') {
          alert('Corona de acetato no disponible en diente')
        } else {
          this.stateOverlays[toothId].push(this.selectedOverlay);
        }

        //Condicion si es "Pieza ausente", solo tendrá ese estado
        if (this.selectedOverlay === 'ausente') {
          this.stateOverlays[toothId] = ['ausente'];
          this.stsDientes[toothId]['state1'] = 'lightgray'
          this.stsDientes[toothId]['state2'] = 'lightgray'
          this.stsDientes[toothId]['state3'] = 'lightgray'
          this.stsDientes[toothId]['state4'] = 'lightgray'
          this.stsDientes[toothId]['state5'] = 'lightgray'
          this.stsDientes[toothId]['state6'] = 'lightgray'
          this.stsDientes[toothId]['state7'] = 'lightgray'
          this.stsDientes[toothId]['state8'] = 'lightgray'
        } else {

          //Validacion para protesis total
          if (this.selectedOverlay === 'protesist') {
            if (this.codDientesSupAdulto.includes(toothId)) {
              this.addProtesisTotalDientes(this.codDientesSupAdulto, toothId);
            }
            if (this.codDientesSupMenor.includes(toothId)) {
              this.addProtesisTotalDientes(this.codDientesSupMenor, toothId);
            }
            if (this.codDientesInfMenor.includes(toothId)) {
              this.addProtesisTotalDientes(this.codDientesInfMenor, toothId);
            }
            if (this.codDientesInfAdulto.includes(toothId)) {
              this.addProtesisTotalDientes(this.codDientesInfAdulto, toothId);
            }
          } else {

            // Aqui entra cuando pasa de 'asuente' a otro estado, que no sea protesis total
            if (this.stateOverlays[toothId].includes('ausente')) {
              this.stateOverlays[toothId].splice(this.stateOverlays[toothId].indexOf('ausente'), 1);
            }
          }
        }

      }
    } else {
      this.stateOverlays[toothId] = []; // Elimina todas las superposiciones
      this.stsDientes[toothId]['state1'] = 'lightgray'
      this.stsDientes[toothId]['state2'] = 'lightgray'
      this.stsDientes[toothId]['state3'] = 'lightgray'
      this.stsDientes[toothId]['state4'] = 'lightgray'
      this.stsDientes[toothId]['state5'] = 'lightgray'
      this.stsDientes[toothId]['state6'] = 'lightgray'
      this.stsDientes[toothId]['state7'] = 'lightgray'
      this.stsDientes[toothId]['state8'] = 'lightgray'

    }
  }

  //Al seleccionar la prestacion, no se agrega img de tratamiento
  validacionSelectPrestacion() {
    this.selectedOverlay = 'NaN'; //NaN, uso para no agregar tratamiento
  }

  //Al presionar el diente o seccion se agregar la prestacion
  onSelectPrestacion(area: string) {

    let codPrestSelect = this.formTratamiento.controls.prest.value;
    if (codPrestSelect) {
      const prestacion = this.prestaciones.filter(p => p.codPrestacion == codPrestSelect)[0];

      console.log('Prestacion select:', prestacion)

      //Agrega prestaciones a vista con detalle //REVISAR !!
      this.listaPrestacionesPaciente.push({
        areaPres: area,
        nomPres: prestacion.nomPrestacion,
        valPres: prestacion.valPrestacion,
      })

      //Prestacion - Area/Diente en Paciente //REVISAR !!
      const nuevaPrestPac: PrestacionPaciente = {
        codPaciente: 1,
        codDiente: area, //area o diente
        codCategoria: 1,
        codPrestacion: prestacion.codPrestacion,
        valSubPrestacion: prestacion.valPrestacion,
        valDescuentoPrestacion: 0
      }
      this.prestacionesPaciente.push(nuevaPrestPac)

      // Reinicia el select de prestacion
      this.formTratamiento.patchValue({
        prest: '',
      });

      // console.log('Prestaciones de paciente: ', this.prestacionesPaciente)
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "info",
        title: "Prestación agregada"
      });
    }
  }

  addProtesisTotalDientes(grupoDientes: string[], toothId: string) {
    // console.log('GrupoDientes', this.codDientesSupAdulto)
    let bandera = false;
    for (let i = 0; i < grupoDientes.length; i++) {
      //Verifica si cada diente es AUSENTE, sino no aplica Protesis Total
      if ((this.stateOverlays[grupoDientes[i]][0] === 'ausente' ||
        this.stateOverlays[grupoDientes[i]][0] === 'protesist')
      ) { //ok
      } else { bandera = true; }
    }
    if (bandera) {
      this.stateOverlays[toothId].splice(this.stateOverlays[toothId].indexOf('protesist'), 1);
      alert('No permite protesis total, necesita que todos los dientes sean ausentes')
    } else {
      // alert('OK, REALIZAR PROTESIS TOTAL !!');
      for (let i = 0; i < grupoDientes.length; i++) {
        this.stateOverlays[grupoDientes[i]] = ['protesist'];
      }

    }
  }


  /**
   * ===============================================================================================================================================
   * Evnair datos al backend
   * ===============================================================================================================================================
   */
  enviarDatos() {
    console.log('Sts Otros', this.getStateColorsWithCodes());
    console.log('Sts Imgs', this.stateOverlays);
    console.log('List PrestacionesDB', this.prestacionesPaciente);
    console.log('List Prestaciones', this.listaPrestacionesPaciente);

  }



  /**
   * Envio de formulario al backend
   */
  onSubmit() {
    if (this.formTratamiento.valid) {
      console.log('Form submitted!', this.formTratamiento.value);


    } else {
      console.log('Form is invalid');
    }
  }

  /**
   * Hooks del ciclo de vida
   */
  ngOnInit(): void {

    for (let i = 0; i < this.supAdulto.length; i++) {
      this.codDientesSupAdulto.push(this.supAdulto[i].cod)
    }
    for (let i = 0; i < this.supMenor.length; i++) {
      this.codDientesSupMenor.push(this.supMenor[i].cod)
    }
    for (let i = 0; i < this.infAdulto.length; i++) {
      this.codDientesInfAdulto.push(this.infAdulto[i].cod)
    }
    for (let i = 0; i < this.infMenor.length; i++) {
      this.codDientesInfMenor.push(this.infMenor[i].cod)
    }

    this.totalItems = this.listaPrestacionesPaciente.length;

    this.primengConfig.ripple = true;
  }

}
