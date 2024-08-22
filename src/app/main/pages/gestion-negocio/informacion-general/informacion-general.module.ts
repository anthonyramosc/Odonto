import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  {
    path: 'riesgo-financiero',
    loadChildren: () => import('./riesgo-financiero/riesgo-financiero.module').then(m => m.RiesgoFinancieroModule)
  },
  {
    path: 'riesgo-credito',
    loadChildren: () => import('./riesgo-credito/riesgo-credito.module').then(m => m.RiesgoCreditoModule)
  },
  {
    path: 'riesgo-mercado',
    loadChildren: () => import('./riesgo-mercado/riesgo-mercado.module').then(m => m.RiesgoMercadoModule)
  },
  {
    path: 'riesgo-liquidez',
    loadChildren: () => import('./riesgo-liquidez/riesgo-liquidez.module').then(m => m.RiesgoLiquidezModule)
  },
  {
    path: 'riesgo-operativo',
    loadChildren: () => import('./riesgo-operativo/riesgo-operativo.module').then(m => m.RiesgoOperativoModule)
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
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class InformacionGeneralModule { }