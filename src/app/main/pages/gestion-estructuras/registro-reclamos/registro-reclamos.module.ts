import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroReclamosComponent } from './registro-reclamos.component';
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
    component: RegistroReclamosComponent
  },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
]

@NgModule({
  declarations: [RegistroReclamosComponent],
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
  exports: [RegistroReclamosComponent]
})
export class RegistroReclamosModule { }
