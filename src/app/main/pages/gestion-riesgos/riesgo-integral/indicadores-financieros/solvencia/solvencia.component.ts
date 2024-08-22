import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SolvenciaService} from './solvencia.service';
import {environment} from "../../../../../../../environments/environment";
import {NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {
    I18n,
    CustomDatepickerI18nEs
} from 'app/auth/service/date-picker-i18nEs.service';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {OficinaService} from "../../../../../_services/oficina.service";
@Component({
    selector: 'app-solvencia',
    templateUrl: './solvencia.component.html',
    styleUrls: ['./solvencia.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SolvenciaComponent implements OnInit {
    data: any;
    public contentHeader: object
    public scgSaldos: any;
    public oficina: any;
    public fechaini: any;
    public fechabalance: any = [];
    public fechabalancegraph: any = [];
    public i18nDPdata: NgbDateStruct;
    public i18nDPdata1: NgbDateStruct;
    public loading = false;
    public submitted = false;
    public solvenciaForm: FormGroup;
    public producto: string = 'MATRIZ';
    balance: string = '0';
    constructor(
        private ScgSaldosService: SolvenciaService,
        private _formBuilder: FormBuilder,
        private _oficinaService: OficinaService
    ) {
    }
    // convenience getter for easy access to form fields
    get f() {
        return this.solvenciaForm.controls;
    }
    ngOnInit(): void {
      //  this._oficinaService.listarOficina().then(res => console.log(res))
    this.ScgSaldosService.getFechaBalance().then(res => {
        res.forEach(data => {
            let month = parseInt(data[1]);
            let year = parseInt(data[0]);
            let startDate = moment([year, month - 1]).format();
            let fecha = moment(startDate).clone().endOf('month').format("DD-MM-YYYY");
            let datos = {
                "fecha" : fecha
            }
            this.fechabalance.push(datos);
            this.cargarGrafico(fecha);
            this.balance = fecha;
        });
    })




        this.solvenciaForm = this._formBuilder.group({
            fecha: ["", [Validators.required]],
            producto: ["", [Validators.required, Validators.min(0)]],
        });

        this.contentHeader = {
            headerTitle: 'Home',
            actionButton: true,
            breadcrumb: {
                type: '',
                links: [
                    {
                        name: 'Gestion Riesgos',
                        isLink: true,
                        link: '/gestion-riesgo'
                    },
                    {
                        name: 'Riesgo Integral',
                        isLink: 'gestion-riesgo/riesgo-inegral/'
                    },
                    {
                        name: 'Indicadores Financieros',
                        isLink: 'gestion-riesgo/riesgo-inegral/indicadores/'
                    },
                    {
                        name: 'Solvencia',
                        isLink: false
                    }
                ]
            }
        }
    }
    public cargarGrafico(fecha){
        this.fechabalancegraph.push(fecha);
        this.data = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre'],
            datasets: [
                {
                    label: 'Patrimonio',
                    data: [56665, 56659, 56680, 55681, 56656, 56955, 55640,58452,58232,58256],
                    fill: false,
                    borderColor: '#42A5F5',
                    tension: .4
                },
               /* {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#FFA726',
                    tension: .4
                }*/
            ]
        }
    }
    onSubmit() {
        this.submitted = true;
        if (this.solvenciaForm.invalid) {
            console.log('ingrese requeridos')
            return;
        }
        const fecha = this.f.fecha.value;
        const fecini = fecha.year + '-' + fecha.month + '-' + fecha.day;
    }
    descargar(){
        this.scgSaldos = environment.apiUrl +"/solvencia/generate";
        window.location.href = this.scgSaldos;
    }

}
