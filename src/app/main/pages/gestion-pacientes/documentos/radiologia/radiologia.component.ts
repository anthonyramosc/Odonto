import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-radiologia',
  templateUrl: './radiologia.component.html',
  styleUrls: ['./radiologia.component.scss']
})
export class RadiologiaComponent implements OnInit {

  //Exámenes Digitales 2D
  ed2d = [
    {id: 1, nom: 'Rx Retroalveolar Pieza'},
    {id: 2, nom: 'Rx Retroalveolar Total'},
    {id: 3, nom: 'Rx Bite-wing'},
    {id: 4, nom: 'Rx Oclusal'}, //RADIO: Superior, Inferior, Superior e Inferior
    {id: 5, nom: 'Rx Panorámica'},
    {id: 6, nom: 'Rx Teleradiografía Lateral'},
    {id: 7, nom: 'Rx Teleradiografía Frontal'},
    {id: 8, nom: 'Rx Digital de Mano'},
  ]

  //Tomografía Computarizada Cone Beam
  tccb = [
    {id: 9, nom: 'Maxilar Superior'},
    {id: 10, nom: 'Maxilar Inferior'},
    {id: 11, nom: 'Bimaxilar'},
    {id: 12, nom: 'Cráneo Completo'},
    {id: 13, nom: 'ATM Boca Cerrada'},
    {id: 14, nom: 'ATM Boca Abierta'},
    {id: 15, nom: 'Zona'},
    {id: 16, nom: 'Estudio Especialidad'},
  ]

  //Análisis Cefalométrico
  ac = [
    {id: 17, nom: 'Rickets'},
    {id: 18, nom: 'Roth'},
    {id: 19, nom: 'Jarabak'},
    {id: 20, nom: 'Frontal'},
    {id: 21, nom: 'Tejidos Blandos'},
    {id: 22, nom: 'Otros'}, //Input text
    {id: 23, nom: 'VTO'}, //Combobox-Select, 2 años , 4 años
    {id: 24, nom: 'Conversión Cefalomé (RC-OC)'},
  ]

  //Registros
  reg = [
    {id: 25, nom: 'Fotografías'},
    {id: 26, nom: 'Modelos'},
    {id: 27, nom: 'Eje real de bisagra clínoco'},
    {id: 28, nom: 'Holta'},
    {id: 29, nom: 'Video'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
