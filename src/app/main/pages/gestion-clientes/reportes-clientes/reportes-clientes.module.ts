import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";


const appRoutes: Routes = [
  {
    path: 'saldos',
    loadChildren: () => import('./saldos-clientes/saldos-clientes.module').then(m => m.SaldosClientesModule)
  },
  {
    path: 'listado',
    loadChildren: () => import('./listado-clientes/listado-clientes.module').then(m => m.ListadoClientesModule)
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
export class ReportesClientesModule { }