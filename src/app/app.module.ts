import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes, Scroll } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import 'hammerjs'
import {NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { TranslateModule } from '@ngx-translate/core'
import { ToastrModule } from 'ngx-toastr' // For auth after login toast
import { CoreModule } from '@core/core.module'
import { CoreCommonModule } from '@core/common.module'
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components'
import { coreConfig } from 'app/app-config'
import { AppComponent } from 'app/app.component'
import { LayoutModule } from 'app/layout/layout.module'
import { SampleModule } from 'app/main/sample/sample.module'
import { PCalendarLocalDirective } from './main/_util/pcalendar-local.directive'

import {MultiSelectModule} from 'primeng/multiselect';

const appRoutes: Routes = [
  {
    path: 'seguridad',
    loadChildren: () => import('./main/pages/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'gestion-riesgo',
    loadChildren: () => import('./main/pages/gestion-riesgos/gestion-riesgos.module').then(m => m.GestionRiesgosModule)
  },
  {
    path: 'gestion-negocio',
    loadChildren: () => import('./main/pages/gestion-negocio/gestion-negocio.module').then(m => m.GestionNegocioModule)
  },

  {
    path: 'gestion-estructuras',
    loadChildren: () => import('./main/pages/gestion-estructuras/gestion-estructuras.module').then(m => m.GestionEstructurasModule)
  },
  
  // {
  //   path: 'reportes',
  //   loadChildren: () => import('./main/pages/gestion-resportes/gestion-resportes.module').then(m => m.GestionReportesModule)
  // },
  
  {
    path: 'dashboard',
    loadChildren: () => import('./main/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./main/pages/gestion-clientes/gestion-clientes.module').then(m => m.GestionClientesModule)
  },
  {
    path: 'proveedores',
    loadChildren: () => import('./main/pages/gestion-proveedores/gestion-proveedores.module').then(m => m.GestionProveedoressModule)
  },
  {
    path: 'contabilidad',
    loadChildren: () => import('./main/pages/gestion-contabilidad/gestion-contabilidad.module').then(m => m.GestionContabilidadModule)
  },

  {
    path: 'pacientes',
    loadChildren: () => import('./main/pages/gestion-pacientes/gestion-pacientes.module').then(m => m.GestionPacientesModule)
  },
  

  /*{
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  },*/
  {
    path: '',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '',
    redirectTo: '/inicio', //Cambiar por /home
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
]

@NgModule({
  declarations: [
    AppComponent,
    PCalendarLocalDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy'
    }),
    TranslateModule.forRoot(),

    //NgBootstrap
    NgbModule,
    ToastrModule.forRoot(),

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,

    // App modules
    LayoutModule,
    SampleModule,

    //Trabaja conjuntamente con pipe y forms
    // FormsModule

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
