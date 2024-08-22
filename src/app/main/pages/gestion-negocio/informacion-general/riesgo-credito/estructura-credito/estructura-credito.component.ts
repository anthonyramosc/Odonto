import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { OficinaService } from 'app/main/_services/oficina.service';
import { environment } from 'environments/environment';
import moment from 'moment';


import { EstructuraCreditoService } from '../../riesgo-credito/estructura-credito/estructura-credito.service';

@Component({
  selector: 'app-estructura-credito',
  templateUrl: './estructura-credito.component.html',
  styleUrls: ['./estructura-credito.component.scss']
})
export class EstructuraCreditoComponent implements OnInit {

    data: any;
    dataPie: any;
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
    public estructuraCreditoForm: FormGroup;
    public producto: string = 'MATRIZ';
    balance: string = '0';
    constructor(
        private SigRfEstrCreditoService: EstructuraCreditoService,
        private _formBuilder: FormBuilder,
        private _oficinaService: OficinaService
    ) {
    }
    // convenience getter for easy access to form fields
    get f() {
        return this.estructuraCreditoForm.controls;
    }
    ngOnInit(): void {
      //  this._oficinaService.listarOficina().then(res => console.log(res))
    this.SigRfEstrCreditoService.getFechaBalance().then(res => {
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
            this.cargarGraficoPie();
            this.cargarGraficoPolar();
            this.balance = fecha;
        });
    })




        this.estructuraCreditoForm = this._formBuilder.group({
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
                        name: 'Riesgo Credito',
                        isLink: 'gestion-negocio/informacion-genneral/riesgo-credito/'
                    },
                    {
                        name: 'Estructura-credito',
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
                    borderColor: 'blue',
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
    public cargarGraficoPie(){
        this.dataPie = {
            labels: [
              'Red',
              'Blue',
              'Yellow'
            ],
            datasets: [{
              label: 'My First Dataset',
              data: [300, 50, 100],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]
          };
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
        if (this.estructuraCreditoForm.invalid) {
            console.log('ingrese requeridos')
            return;
        }
        const fecha = this.f.fecha.value;
        const fecini = fecha.year + '-' + fecha.month + '-' + fecha.day;
    }
    descargar(){
        this.scgSaldos = environment.apiUrl +"/estructuracredito/generate";
        window.location.href = this.scgSaldos;
    }

      
}
