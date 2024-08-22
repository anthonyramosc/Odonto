import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SUPERIORADULTO } from 'app/main/_util/dientes/SuperiorAdulto';
import { SUPERIORMENOR } from 'app/main/_util/dientes/SuperiorMenor';
import { INFERIORADULTO } from 'app/main/_util/dientes/InferiorAdulto';
import { INFERIORMENOR } from 'app/main/_util/dientes/InferiorMenor';
import { COLORCODES, STSDIENTES } from 'app/main/_util/dientes/estados';
import { STSDIENTESIMG } from 'app/main/_util/dientes/estadosImg';


@Component({
  selector: 'app-odontograma',
  templateUrl: './odontograma.component.html',
  styleUrls: ['./odontograma.component.scss']
})
export class OdontogramaComponent implements OnInit {

  //Formulario
  formOdontograma: FormGroup;

  /**
   * ===============================================================================================================================================
   * Estado de dientes: Vista transversal
   * ===============================================================================================================================================
   */
  selectedColor: string = 'lightgray'; // Color por defecto

  supAdulto = SUPERIORADULTO;
  supMenor = SUPERIORMENOR;
  infAdulto = INFERIORADULTO;
  infMenor = INFERIORMENOR;

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

  constructor(
    private fb: FormBuilder
  ) {
  }

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

        //Condicion si es "Pieza ausente"
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
          // Aqui entra cuando pasa de 'asuente' a otro estado
          if (this.stateOverlays[toothId].includes('ausente')) {
            this.stateOverlays[toothId].splice(this.stateOverlays[toothId].indexOf('ausente'), 1);
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


  /**
   * ===============================================================================================================================================
   * Evnair datos al backend
   * ===============================================================================================================================================
   */
  enviarDatos() {
    console.log('Otros', this.getStateColorsWithCodes());
    console.log('Imgs', this.stateOverlays);

  }



  /**
   * Envio de formulario al backend
   */
  onSubmit() {
    if (this.formOdontograma.valid) {
      console.log('Form submitted!', this.formOdontograma.value);
      // Aquí puedes manejar los datos del formulario, como enviarlos a un servidor
    } else {
      console.log('Form is invalid');
    }
  }

  /**
   * Hooks del ciclo de vida
   */
  ngOnInit(): void {
    // this.formOdontograma = this.fb.group({
    //   sts1: ['', Validators.required],
    //   sts2: ['', [Validators.required]]
    // });
  }



}
