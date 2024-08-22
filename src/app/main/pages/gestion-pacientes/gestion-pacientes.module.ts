import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionPacientesComponent } from './gestion-pacientes.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreCommonModule } from '@core/common.module';
import { AnamnesisGeneralComponent } from './anamnesis-general/anamnesis-general.component';
import { ExamenOdontologicoComponent } from './examen-odontologico/examen-odontologico.component';
import { OdontogramaComponent } from './examen-odontologico/odontograma/odontograma.component';
import { DisfuncionComponent } from './examen-odontologico/disfuncion/disfuncion.component';
import { EndodonciaComponent } from './examen-odontologico/endodoncia/endodoncia.component';
import { PeriodonciaComponent } from './examen-odontologico/periodoncia/periodoncia.component';
import { CirugiaOrtognaticaComponent } from './examen-odontologico/cirugia-ortognatica/cirugia-ortognatica.component';
import { OrtodonciaComponent } from './examen-odontologico/ortodoncia/ortodoncia.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { RecetasComponent } from './documentos/recetas/recetas.component';
import { InterconsultasComponent } from './documentos/interconsultas/interconsultas.component';
import { DocClinicosComponent } from './documentos/doc-clinicos/doc-clinicos.component';
import { DerivacionesComponent } from './documentos/derivaciones/derivaciones.component';
import { LaboratorioComponent } from './documentos/laboratorio/laboratorio.component';
import { RadiologiaComponent } from './documentos/radiologia/radiologia.component';
import { InformesComponent } from './informes/informes.component';
import { TratamientosComponent } from './tratamientos/tratamientos.component';
import { ImagenesComponent } from './imagenes/imagenes.component';
import { ListadoComponent } from './listado/listado.component';

import { MultiSelectModule } from 'primeng/multiselect';
import {TableModule} from 'primeng/table';

// routing
const routes: Routes = [
  {
    path: 'ficha',
    component: GestionPacientesComponent
  },
  {
    path: 'listado',
    component: ListadoComponent
  },
]

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes), NgbModule, FormsModule, ReactiveFormsModule, CoreCommonModule, MultiSelectModule, TableModule
  ],
  declarations: [
    GestionPacientesComponent, 
    AnamnesisGeneralComponent, 
    ExamenOdontologicoComponent, 
    OdontogramaComponent, 
    DisfuncionComponent, 
    EndodonciaComponent, 
    PeriodonciaComponent, 
    CirugiaOrtognaticaComponent, 
    OrtodonciaComponent, 
    DocumentosComponent, 
    RecetasComponent, 
    InterconsultasComponent, 
    DocClinicosComponent, 
    DerivacionesComponent, 
    LaboratorioComponent, 
    RadiologiaComponent, 
    InformesComponent, 
    TratamientosComponent, 
    ImagenesComponent, ListadoComponent],
})
export class GestionPacientesModule { }
