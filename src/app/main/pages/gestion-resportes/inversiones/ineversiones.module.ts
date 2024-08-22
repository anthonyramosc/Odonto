import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";


const appRoutes: Routes = [
  {
    path: 'i01',
    loadChildren: () => import('./i01/i01.module').then(m => m.I01Module)
  },
  {
    path: 'i02',
    loadChildren: () => import('./i02/i02.module').then(m => m.I02Module)
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
export class InversionesModule { }