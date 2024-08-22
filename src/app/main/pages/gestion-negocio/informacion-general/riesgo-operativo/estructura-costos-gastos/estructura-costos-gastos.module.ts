import { NgModule } from '@angular/core';
import { EstructuraCostosGastosComponent } from './estructura-costos-gastos.component';
import {RouterModule, Routes} from "@angular/router";
import {ContentHeaderModule} from "../../../../../../layout/components/content-header/content-header.module";
import {TranslateModule} from "@ngx-translate/core";
import {CoreCommonModule} from "../../../../../../../@core/common.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CalendarModule } from 'primeng/calendar';
import {NgSelectModule} from "@ng-select/ng-select";
import {ChartModule} from 'primeng/chart';

const appRoutes: Routes = [
  {
    path: '',
    component: EstructuraCostosGastosComponent
  },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
]
@NgModule({
  declarations: [EstructuraCostosGastosComponent],
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
    ChartModule
  ],
  /*providers: [{
     provide: NgbDateParserFormatter,
    useValue: new NgbCustomDateParserFormatter("YYYY-MM-DD") // <== format!
  }],*/
  exports: [EstructuraCostosGastosComponent]
})
export class EstructuraCostosGastosModule { }