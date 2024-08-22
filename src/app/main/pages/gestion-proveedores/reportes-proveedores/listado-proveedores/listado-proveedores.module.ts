import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoProveedoresComponent } from './listado-proveedores.component';
import { RouterModule, Routes } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CalendarModule } from 'primeng/calendar';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartModule } from 'primeng/chart';

const appRoutes: Routes = [
  {
    path: '',
    component: ListadoProveedoresComponent
  },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
]

@NgModule({
  declarations: [ListadoProveedoresComponent],
  imports: [ContentHeaderModule,
    CalendarModule,
    TranslateModule,
    CoreCommonModule,
    RouterModule.forChild(appRoutes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CoreCommonModule,
    NgSelectModule,
    ChartModule,
  ],
  exports: [ListadoProveedoresComponent]
})
export class ListadoProveedoresModule { }
