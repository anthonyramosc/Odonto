import { NgModule } from '@angular/core';
import { RegistroDacionPagoComponent } from './registro-dacion-pago.component';
import {RouterModule, Routes} from "@angular/router";
import {ContentHeaderModule} from "../../../../../layout/components/content-header/content-header.module";
import {TranslateModule} from "@ngx-translate/core";
import {CoreCommonModule} from "../../../../../../@core/common.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CalendarModule } from 'primeng/calendar';
import {NgSelectModule} from "@ng-select/ng-select";
import {ChartModule} from 'primeng/chart';
import { FilternumopPipe } from '../pipes/filternumop.pipe';
import { FilteridPipe } from '../pipes/filterid.pipe';
import { FiltertipobienPipe } from '../pipes/filtertipobien.pipe';
import { FilternomemisorPipe } from '../pipes/filternomemisor.pipe';
import { FilterfecemisionPipe } from '../pipes/filterfecemision.pipe';
import { FiltervalorPipe } from '../pipes/filtervalor.pipe';

const appRoutes: Routes = [
  {
    path: '',
    component: RegistroDacionPagoComponent
  },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
]
@NgModule({
  declarations: [
    RegistroDacionPagoComponent,
    FilternumopPipe,
    FilteridPipe, 
    FiltertipobienPipe,
    FilternomemisorPipe,
    FilterfecemisionPipe,
    FiltervalorPipe
  ],
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
  /*providers: [{
     provide: NgbDateParserFormatter,
    useValue: new NgbCustomDateParserFormatter("YYYY-MM-DD") // <== format!
  }],*/
  exports: [RegistroDacionPagoComponent]
})
export class RegistroDacionPagoModule { }
