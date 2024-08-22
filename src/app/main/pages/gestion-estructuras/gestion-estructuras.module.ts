import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { RegistroReclamosComponent } from './registro-reclamos/registro-reclamos.component';


const appRoutes: Routes = [
  {
    path: 'gestion-inversiones',
    loadChildren: () => import('./gestion-inversiones/gestion-inversionesmodule').then(m => m.GestionInversionesModule)
  },
  {
    path: 'gestion-dacionpago',
    loadChildren: () => import('./gestion-dacion-pago/gestion-dacionpagomodule').then(m => m.GestionDacionPagoModule)
  },

  {
    path: 'registro-reclamo',
    loadChildren: () => import('./registro-reclamos/registro-reclamos.module').then(m => m.RegistroReclamosModule)
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
  ]
})
export class GestionEstructurasModule { }