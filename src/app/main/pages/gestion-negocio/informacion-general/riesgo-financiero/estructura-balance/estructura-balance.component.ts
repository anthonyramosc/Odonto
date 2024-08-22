import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { EstructuraBalanceService } from './estructura-balance.service';
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
    selector: 'app-estructura-balance',
    templateUrl: './estructura-balance.component.html',
    styleUrls: ['./estructura-balance.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class EstructuraBalanceComponent implements OnInit {


    selectedCar: number;
    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];


    data: any;
    dataPolarArea: any;
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
    public estructuraBalanceForm: FormGroup;
    public producto: string = 'MATRIZ';
    balance: string = '0';
    constructor(
        private SigRfEstrBalanceService: EstructuraBalanceService,
        private _formBuilder: FormBuilder,
        private _oficinaService: OficinaService
    ) {
    }
    // convenience getter for easy access to form fields
    get f() {
        return this.estructuraBalanceForm.controls;
    }
    ngOnInit(): void {

      //  this._oficinaService.listarOficina().then(res => console.log(res))
        this.SigRfEstrBalanceService.getFechaBalance().then(res => {
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
                this.cargarGraficoPolar();
                this.balance = fecha;
            });
        })




        this.estructuraBalanceForm = this._formBuilder.group({
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
                        name: 'Gestion Negocio',
                        isLink: true,
                        link: '/gestion-negocio'
                    },
                    {
                        name: 'Informacion General',
                        isLink: 'gestion-negocio/informacion-genneral/'
                    },
                    {
                        name: 'Riesgo Financiero',
                        isLink: 'gestion-negocio/informacion-genneral/riesgo-financiero/'
                    },
                    {
                        name: 'Estructura-balance',
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
                    data: [58256, 58232, 58452, 55640, 56955, 56656, 55681,56680,56659,56665],
                    fill: false,
                    borderColor: '#FC1818',
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
    public cargarGraficoPolar(){
        this.dataPolarArea = {
            labels: [
              'Red',
              'Green',
              'Yellow',
              'Grey',
              'Blue'
            ],
            datasets: [{
              label: 'My First Dataset',
              data: [11, 16, 7, 3, 14],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
                'rgb(201, 203, 207)',
                'rgb(54, 162, 235)'
              ]
            }]
          };
    }
    onSubmit() {
        this.submitted = true;
        if (this.estructuraBalanceForm.invalid) {
            console.log('ingrese requeridos')
            return;
        }
        const fecha = this.f.fecha.value;
        const fecini = fecha.year + '-' + fecha.month + '-' + fecha.day;
    }
    descargar(){
        alert('/estructurabalance/generate/5-2019/5-2021');
        // this.scgSaldos = environment.apiUrl +"/estructurabalance/generate";
        // window.location.href = this.scgSaldos;
    }

    changeFn(val){
        alert('/estructurabalance/generate/5-2019/5-2021');
    }
    
    // openFile(){
    //     this.SigRfEstrBalanceService.getReportFile().then(res => {
    //         res.toString();
    //     })
    // }
}