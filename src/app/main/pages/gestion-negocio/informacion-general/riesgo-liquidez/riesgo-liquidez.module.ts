import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

const appRoutes: Routes = [
  {
    path: 'liquidez-estructural',
    loadChildren: () => import('./liquidez-estructural/liquidez-estructural.module').then(m => m.LiquidezEstructuralModule)
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
export class RiesgoLiquidezModule { }