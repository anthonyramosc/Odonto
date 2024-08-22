import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  {
    path: 'bce01',
    loadChildren: () => import('./bce01/bce01.module').then(m => m.Bce01Module)
  },
  {
    path: 'bce02',
    loadChildren: () => import('./bce02/bce02.module').then(m => m.Bce02Module)
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
export class BceModule { }
