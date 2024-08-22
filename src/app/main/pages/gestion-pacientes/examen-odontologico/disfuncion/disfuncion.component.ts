import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disfuncion',
  templateUrl: './disfuncion.component.html',
  styleUrls: ['./disfuncion.component.scss']
})
export class DisfuncionComponent implements OnInit {

  tipoRuido = [
    {
      id: 0,
      nom: "Ninguno"
    },
    {
      id: 1,
      nom: "Click"
    },
    {
      id: 2,
      nom: "Crepitación"
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
