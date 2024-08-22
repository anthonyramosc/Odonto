import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-laboratorio',
  templateUrl: './laboratorio.component.html',
  styleUrls: ['./laboratorio.component.scss']
})
export class LaboratorioComponent implements OnInit {

  //Protesis fija unitaria
  pfu = [
    {id: 1, nom: 'PFU sobre diente: all ceram'},
    {id: 2, nom: 'PFU sobre diente: metal/porcelana'},
    {id: 3, nom: 'PFU sobre diente: metálica'},
    {id: 4, nom: 'PFU sobre IOI: all ceram'},
    {id: 5, nom: 'PFU sobre IOI: metal/porcelana'},
    {id: 6, nom: 'PFU sobre IOI: metálica'},
  ] 
  //Protesis fija plural
  pfp = [
    {id: 1, nom: 'PFP sobre diente: all ceram'},
    {id: 2, nom: 'PFP sobre diente: metal/porcelana'},
    {id: 3, nom: 'PFP sobre diente: metálica'},
    {id: 4, nom: 'PFP sobre IOI: all ceram'},
    {id: 5, nom: 'PFP sobre IOI: metal/porcelana'},
    {id: 6, nom: 'PFP sobre IOI: metálica'},
  ] 

  pr = [
    {id: 1, nom: 'PR Convencional: Prótesis total acrílica'},
    {id: 2, nom: 'PR Convencional: Prótesis parcial acrílica'},
    {id: 3, nom: 'PR Convencional: Prótesis parcial metálica'},
    {id: 4, nom: 'PR Sobre implante: Sobredentadura'},
    {id: 5, nom: 'PR Sobre implante: Prótesis Híbrida'},
  ] 

  oi = [
    {id: 1, nom: 'Inlay: Cerómeros'},
    {id: 2, nom: 'Inlay: Porcelana'},
    {id: 3, nom: 'Inlay: Metálico'},
    {id: 4, nom: 'Onlay: Cerómeros'},
    {id: 5, nom: 'Onlay: Porcelana'},
    {id: 6, nom: 'Onlay: Metálico'},
    {id: 7, nom: 'Overlay: Cerómeros'},
    {id: 8, nom: 'Overlay: Porcelana'},
    {id: 9, nom: 'Overlay: Metálico'},
  ] 

  otros = [
    {id: 1, nom: 'Encerado Diagnóstico'},
    {id: 2, nom: 'Provisorios'},
    {id: 3, nom: 'SEM colado'},
    {id: 4, nom: 'PF de sustitución'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
