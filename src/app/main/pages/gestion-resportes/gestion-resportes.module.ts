import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";


const appRoutes: Routes = [
  {
    path: 'inversiones',
    loadChildren: () => import('./inversiones/ineversiones.module').then(m => m.InversionesModule)
  },
  {
    path: 'bienes-recibidos',
    loadChildren: () => import('./bienes-recibidos/ineversiones.module').then(m => m.BienesRecibidosModule)
  },
  {
    path: 'brechas-liquidez',
    loadChildren: () => import('./brechas-liquidez/brechas-liquidez.module').then(m => m.BrechasLiquidezModule)
  },
  {
    path: 'estructura-socios',
    loadChildren: () => import('./socios/socios.module').then(m => m.SociosModule)
  },
  {
    path: 'estructura-reclamos',
    loadChildren: () => import('./reclamos/reclamos.module').then(m => m.ReclamosModule)
  },
  {
    path: 'indicadores-genero',
    loadChildren: () => import('./genero/genero.module').then(m => m.GeneroModule)
  },

  {
    path: 'bce',
    loadChildren: () => import('./bce/bce.module').then(m => m.BceModule)
  },
  {
    path: 'sri-aux',
    loadChildren: () => import('./sri/sri.module').then(m => m.SriModule)
  },
  //Reporte formulario de clientes
  {
    // path: 'conozca-cliente',
    path: 'rotef',
    loadChildren: () => import('./conozca-cliente/conozca-cliente.module').then(m => m.ConozcaClienteModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [],
})
export class GestionReportesModule { }