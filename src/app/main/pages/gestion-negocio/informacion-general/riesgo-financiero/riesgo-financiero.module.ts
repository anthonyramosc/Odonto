import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

const appRoutes: Routes = [
  {
    path: 'estructura-balance',
    loadChildren: () => import('./estructura-balance/estructura-balance.module').then(m => m.EstructuraBalanceModule)
  },
  {
    path: 'estructura-activo',
    loadChildren: () => import('./estructura-activo/estructura-activo.module').then(m => m.EstructuraActivoModule)
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
    NgbModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class RiesgoFinancieroModule { }