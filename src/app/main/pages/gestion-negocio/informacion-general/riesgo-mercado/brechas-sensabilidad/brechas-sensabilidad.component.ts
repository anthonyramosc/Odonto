import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { OficinaService } from 'app/main/_services/oficina.service';
import { environment } from 'environments/environment';
import moment from 'moment';
import { BreachasSensibilidadService } from './brechas-sensibilidad.service';

@Component({
  selector: 'app-brechas-sensabilidad',
  templateUrl: './brechas-sensabilidad.component.html',
  styleUrls: ['./brechas-sensabilidad.component.scss']
})
export class BrechasSensabilidadComponent implements OnInit {

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
    public breachaSensibilidadForm: FormGroup;
    public producto: string = 'MATRIZ';
    balance: string = '0';
    constructor(
        private SigRfEstrBalanceService: BreachasSensibilidadService,
        private _formBuilder: FormBuilder,
        private _oficinaService: OficinaService
    ) {
    }
    // convenience getter for easy access to form fields
    get f() {
        return this.breachaSensibilidadForm.controls;
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




        this.breachaSensibilidadForm = this._formBuilder.group({
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
        if (this.breachaSensibilidadForm.invalid) {
            console.log('ingrese requeridos')
            return;
        }
        const fecha = this.f.fecha.value;
        const fecini = fecha.year + '-' + fecha.month + '-' + fecha.day;
    }
    descargar(){
        this.scgSaldos = environment.apiUrl +"/estructurabalance/generate";
        window.location.href = this.scgSaldos;
    }

}
