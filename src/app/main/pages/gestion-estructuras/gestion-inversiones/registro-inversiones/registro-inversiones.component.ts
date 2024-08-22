import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { RegistroInversionesService } from './registro-inversiones.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { DatePipe } from '@angular/common';
import { Console } from 'console';

@Component({
  selector: 'app-registro-inversiones',
  templateUrl: './registro-inversiones.component.html',
  styleUrls: ['./registro-inversiones.component.scss']
})
export class RegistroInversionesComponent implements OnInit {

  data: any;
  balance: string = '0';
  public fechabalance: any = [];
  public fechabalancegraph: any = [];

  //Filtros para tabla
  filternumdeposito = "";
  filterfecdep = "";
  filterfeccompra = "";
  filtermonto = "";

  //Datos formulario Completo
  public inversiones: Array<any> = []

  public bancos: Array<any> = [];

  //Forms
  registerForm: FormGroup;
  submitted = false;

  //Json to Send
  dataInv: any;

  //Bancos
  banco = "BANCO DEL AUSTRO"

  //Select Data
  listaTipoInstr = [
    {
      "cod": 1,
      "desc": "T01"
    },
    {
      "cod": 2,
      "desc": "T02"
    },
    {
      "cod": 3,
      "desc": "T03"
    },
    {
      "cod": 4,
      "desc": "T04"
    },
    {
      "cod": 5,
      "desc": "T05"
    },
    {
      "cod": 6,
      "desc": "T06"
    },
    {
      "cod": 7,
      "desc": "T07"
    },
    {
      "cod": 8,
      "desc": "T08"
    },
    {
      "cod": 9,
      "desc": "T09"
    },
    {
      "cod": 10,
      "desc": "T10"
    },
    {
      "cod": 11,
      "desc": "T11"
    },

    {
      "cod": 12,
      "desc": "T12"
    },
    {
      "cod": 13,
      "desc": "T13"
    },
    {
      "cod": 14,
      "desc": "T14"
    },
    {
      "cod": 15,
      "desc": "T15"
    },
    {
      "cod": 16,
      "desc": "T16"
    },
    {
      "cod": 17,
      "desc": "T17"
    },
    {
      "cod": 18,
      "desc": "T18"
    },
    {
      "cod": 19,
      "desc": "T19"
    },
    {
      "cod": 20,
      "desc": "T20"
    },
    {
      "cod": 21,
      "desc": "T21"
    },
    {
      "cod": 22,
      "desc": "T22"
    },
    {
      "cod": 23,
      "desc": "T23"
    },
    {
      "cod": 24,
      "desc": "T24"
    },
    {
      "cod": 25,
      "desc": "T25"
    },
    {
      "cod": 26,
      "desc": "T26"
    },
    {
      "cod": 27,
      "desc": "T27"
    },
    {
      "cod": 28,
      "desc": "T28"
    },
    {
      "cod": 29,
      "desc": "T29"
    },
    {
      "cod": 30,
      "desc": "T30"
    },
    {
      "cod": 31,
      "desc": "T31"
    },
    {
      "cod": 32,
      "desc": "T32"
    },
    {
      "cod": 33,
      "desc": "T33"
    },
    {
      "cod": 34,
      "desc": "T34"
    },
    {
      "cod": 35,
      "desc": "T35"
    },
    {
      "cod": 36,
      "desc": "T36"
    },
    {
      "cod": 37,
      "desc": "T37"
    },
  ];

  listaPais = [
    {
      "cod": 593,
      "desc": "ECU"
    }
  ];
  listaCalfRiesgo = [
    {
      "cod": 30,
      "desc": "No Disponible"
    },
    {
      "cod": 25,
      "desc": "E"
    },
    {
      "cod": 24,
      "desc": "AAA+"
    },
    {
      "cod": 22,
      "desc": "AAA-"
    },
    {
      "cod": 21,
      "desc": "AAA"
    },
    {
      "cod": 20,
      "desc": "AA+"
    },
    {
      "cod": 19,
      "desc": "AA"
    },
    {
      "cod": 18,
      "desc": "AA-"
    },
    {
      "cod": 17,
      "desc": "A+"
    },
    {
      "cod": 16,
      "desc": "A"
    },
    {
      "cod": 15,
      "desc": "A-"
    },
    {
      "cod": 14,
      "desc": "BBB+"
    },
    {
      "cod": 13,
      "desc": "BBB"
    },
    {
      "cod": 12,
      "desc": "BBB-"
    },
    {
      "cod": 11,
      "desc": "BB+"
    },
    {
      "cod": 10,
      "desc": "BB"
    },
    {
      "cod": 9,
      "desc": "BB-"
    },
    {
      "cod": 8,
      "desc": "B+"
    },
    {
      "cod": 7,
      "desc": "B"
    },
    {
      "cod": 6,
      "desc": "B-"
    },
    {
      "cod": 5,
      "desc": "CCC+"
    },
    {
      "cod": 4,
      "desc": "CCC"
    },
    {
      "cod": 3,
      "desc": "CCC-"
    },
    {
      "cod": 2,
      "desc": "CC"
    },
    {
      "cod": 1,
      "desc": "C"
    },
    {
      "cod": 0,
      "desc": "D"
    },



  ];
  listaCalficadoraRiesgo = [
    {
      "cod": 0,
      "desc": "No Disponible"
    },
    {
      "cod": 1,
      "desc": "Standard & Poor's (S & P)"
    },
    {
      "cod": 2,
      "desc": "Moody's"
    },
    {
      "cod": 3,
      "desc": "Fitch"
    },
    {
      "cod": 4,
      "desc": "Bank Watch Ratings"
    },
    {
      "cod": 5,
      "desc": "Ecuability"
    },
    {
      "cod": 6,
      "desc": "Humphreys"
    },
    {
      "cod": 7,
      "desc": "PCR Pacific"
    },
    {
      "cod": 8,
      "desc": "Soc. Cal. Riesgo Latinoamericana SCR LA"
    },
    {
      "cod": 9,
      "desc": "Class International Rating"
    },
    {
      "cod": 10,
      "desc": "Microfinanza Rating"
    },
    {
      "cod": 11,
      "desc": "Otras"
    },
  ];

  listaEstadoTirulo = [
    {
      "cod": 1,
      "desc": "PR"
    },
    {
      "cod": 2,
      "desc": "ER"
    },
    {
      "cod": 3,
      "desc": "GR"
    },
    {
      "cod": 5,
      "desc": "LI"
    }
  ];

  listaCalifRiesgoNormativa = [
    {
      "cod": 1,
      "desc": "A"
    },
    {
      "cod": 2,
      "desc": "B"
    },
    {
      "cod": 3,
      "desc": "C"
    },
    {
      "cod": 4,
      "desc": "D"
    },
    {
      "cod": 5,
      "desc": "E"
    }
  ];

  // listaBancos = [
  //   {
  //     "cod": 1,
  //     "nom": "BANCO DE GUAYAQUIL",
  //   },
  //   {
  //     "cod": 2,
  //     "nom": "BANCO DEL PICHINCHA",
  //   },
  //   {
  //     "cod": 3,
  //     "nom": "BANCO BOLIVARIANO",
  //   },
  //   {
  //     "cod": 4,
  //     "nom": "BANCO DEL AUSTRO",
  //   },
  //   {
  //     "cod": 5,
  //     "nom": "BANCO DEL PACIFICO",
  //   },
  //   {
  //     "cod": 6,
  //     "nom": "PRODUBANCO",
  //   },
  //   {
  //     "cod": 7,
  //     "nom": "BANCO DE MACHALA",
  //   },
  //   {
  //     "cod": 8,
  //     "nom": "BANCO PROMERICA",
  //   },
  //   {
  //     "cod": 9,
  //     "nom": "BANCO INTERNACIONAL",
  //   },
  //   {
  //     "cod": 10,
  //     "nom": "UNIBANCO",
  //   },
  //   {
  //     "cod": 11,
  //     "nom": "BANCO PROCREDIT",
  //   },
  //   {
  //     "cod": 12,
  //     "nom": "BANCO FOMENTO",
  //   },
  //   {
  //     "cod": 13,
  //     "nom": "BANCO GENERAL RUMIÑAHUI",
  //   },
  //   {
  //     "cod": 14,
  //     "nom": "CITIBANK, N.A.",
  //   },
  //   {
  //     "cod": 15,
  //     "nom": "BANCO DEL LITORAL S.A",
  //   }

  // ];

  seleccionadoTipoInstr: string;
  seleccionadoPais: string;
  seleccionadoCalifRiesgo: string;
  seleccionadoCalifadoraRiesgo: string;
  seleccionadoEstadoTitulo: string;
  seleccionadoCalifRiesgNormativa: string
  seleccionadoBanco: string;

  flagUpdateInversion = false;

  itemSeleccionado: any;

  constructor(
    private ScgInversionesService: RegistroInversionesService,
    private formBuilder: FormBuilder,
  ) {

  }

  ngOnInit() {

    //Inicia con datos en tabla
    this.ScgInversionesService.getInversiones().subscribe((resp: any) => {
      this.inversiones = resp;
    })

    //Servicio de Bancos
    this.ScgInversionesService.getBancos().subscribe((resp: any) => {
      this.bancos = resp;
    })

    //Validar Formulario
    this.registerForm = this.formBuilder.group({
      inputNumDep: ['', Validators.required],
      inputNomInstit: ['', Validators.required],
      inputFecEmis: ['', Validators.required],
      inputFecCompra: ['', Validators.required],
      inputTipInstr: ['', Validators.required],
      inputPais: ['', Validators.required],
      inputValNominal: ['', Validators.required],
      inputValCompra: ['', Validators.required],
      inputPerPago: ['', Validators.required],
      inputFecVencimiento: ['', Validators.required],
      inputCalificacionRies: ['', Validators.required],
      inputCalificadoraRies: ['', Validators.required],
      inputFecUltCalif: ['', Validators.required],
      inputValLibros: ['', Validators.required],
      inputCuentContable: ['', Validators.required],
      inputEstadoTitulo: ['', Validators.required],
      inputInteres: ['', Validators.required],
      inputInteresGen: ['', Validators.required],
      inputCalifRiesgNormativa: ['', Validators.required],
      inputProvConst: ['', Validators.required],
    });

  }

  get f() { return this.registerForm.controls; }

  alertWithSuccess() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error en almacenar los datos!'
    })
  }

  //Cargar datos a Postgres
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    // console.log(this.registerForm.value) //muestra contenido de form completo

    var getfechaEmi = new Date(this.registerForm.value.inputFecEmis);
    // getfechaEmi.setDate(getfechaEmi.getDate() + 1);
    var fechEmisSet = getfechaEmi.toISOString().split('T')[0];

    var getfechaComp = new Date(this.registerForm.value.inputFecCompra);
    // getfechaComp.setDate(getfechaComp.getDate() + 1);
    var fechCompSet = getfechaComp.toISOString().split('T')[0];

    var getfechaVenc = new Date(this.registerForm.value.inputFecVencimiento);
    // getfechaVenc.setDate(getfechaVenc.getDate() + 1);
    var fechVencSet = getfechaVenc.toISOString().split('T')[0];

    var getfechaUltCal = new Date(this.registerForm.value.inputFecUltCalif);
    // getfechaUltCal.setDate(getfechaUltCal.getDate() + 1);
    var fechUltCalSet = getfechaUltCal.toISOString().split('T')[0];

    //Si es codInst 36,37 = Camp clasif del em/depo es "DE"
    var clasifEmDe;
    if (parseInt(this.registerForm.value.inputTipInstr) == 36 || parseInt(this.registerForm.value.inputTipInstr) == 37) {
      clasifEmDe = "DE";
    } else {
      clasifEmDe = "EM";
    }

    this.dataInv = {
      id: {
        numDeposito: this.registerForm.value.inputNumDep, //123123
        codBanco: this.registerForm.value.inputNomInstit, //codBanco Ej: 1 - Para I01, I02 necesita RUC
        fecDeposito: fechEmisSet,//fechEmisSet,
        fecCompra: fechCompSet
      },
      numPlazo: this.registerForm.value.inputPerPago, //25
      codInstrumentoInv: parseInt(this.registerForm.value.inputTipInstr), //1
      codPais: parseInt(this.registerForm.value.inputPais), //1
      valNominal: this.registerForm.value.inputValNominal, //103646.09
      valCompra: this.registerForm.value.inputValCompra, //103646.09
      clasifEmisorDepositario: clasifEmDe, //"EM" ---------------------------------------------
      codTipoEmisorDepositarioInv: 1, //1 -----------------------------------------------
      fecVencimiento: fechVencSet,
      codCalificacionRiesgoInv: parseInt(this.registerForm.value.inputCalificacionRies), //25
      codCalificadoraRiesgoInv: parseInt(this.registerForm.value.inputCalificadoraRies), //1
      fecUltimaCalificacion: fechUltCalSet,
      codCuentaContable: this.registerForm.value.inputCuentContable.toString(), //"5202300500"
      valLibros: this.registerForm.value.inputValLibros,  //53930.24
      codStsTituloInv: parseInt(this.registerForm.value.inputEstadoTitulo), //1
      valTasaInteresNominal: this.registerForm.value.inputInteres, //7.65
      valInteresGenerado: this.registerForm.value.inputInteresGen, //171.9
      codCalifRiesgoNormativaInv: parseInt(this.registerForm.value.inputCalifRiesgNormativa), //1
      valProvisionConstituida: this.registerForm.value.inputProvConst //103.14
    }

    console.log(this.dataInv)

    if (this.flagUpdateInversion) {

      // Create Enviar al backend
      this.ScgInversionesService.updateInversiones(this.dataInv).subscribe((resp: any) => {
        console.log(resp);

        if (resp.status == 0) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Actualizacion de datos exitoso',
            showConfirmButton: false,
            timer: 1500
          })

          //Actualizar tabla
          this.ScgInversionesService.getInversiones().subscribe((resp: any) => {
            this.inversiones = resp;
          })

          //Encerar el formulario
          this.setForm();

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error en almacenar los datos!'
          })
        }

        this.flagUpdateInversion = false;

      })

    } else {
      // Create Enviar al backend
      this.ScgInversionesService.postInversiones(this.dataInv).subscribe((resp: any) => {
        console.log(resp);

        if (resp.status == 0) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro de datos exitoso',
            showConfirmButton: false,
            timer: 1500
          })

          //Actualizar tabla
          this.ScgInversionesService.getInversiones().subscribe((resp: any) => {
            this.inversiones = resp;
          })

          //Encerar el formulario
          this.setForm();

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error en actualizar los datos!'
          })
        }

      })

    }


  }

  seleccionarItem(item: any): void {
    console.log("item", item)
    this.itemSeleccionado = item;
  }


  actualizarRegistro() {
    var inversion = this.itemSeleccionado;
    console.log(inversion);
    this.flagUpdateInversion = true;
    this.updateForm(inversion);
  }

  public updateForm(inversion) {
    this.registerForm = this.formBuilder.group({
      inputNumDep: inversion.id.numDeposito,
      inputNomInstit: inversion.id.codBanco,
      inputFecEmis: inversion.id.fecDeposito,
      inputFecCompra: inversion.id.fecCompra,
      inputTipInstr: inversion.codInstrumentoInv,
      inputPais: inversion.codPais,
      inputValNominal: inversion.valNominal,
      inputValCompra: inversion.valCompra,
      inputPerPago: inversion.numPlazo,
      inputFecVencimiento: inversion.fecVencimiento,
      inputCalificacionRies: inversion.codCalificacionRiesgoInv,
      inputCalificadoraRies: inversion.codCalificadoraRiesgoInv,
      inputFecUltCalif: inversion.fecUltimaCalificacion,
      inputValLibros: inversion.valLibros,
      inputCuentContable: inversion.codCuentaContable,
      inputEstadoTitulo: inversion.codStsTituloInv,
      inputInteres: inversion.valTasaInteresNominal,
      inputInteresGen: inversion.valInteresGenerado,
      inputCalifRiesgNormativa: inversion.codCalifRiesgoNormativaInv,
      inputProvConst: inversion.valProvisionConstituida,
    });
  }

  eliminarRegistro() {

    var inversion = this.itemSeleccionado;
    console.log("del inv", inversion)

    // Delete Enviar al backend
    this.ScgInversionesService.delInversiones(inversion).subscribe((resp: any) => {
      console.log(resp);

      if (resp.status == 0) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Eliminacion de registro exitoso',
          showConfirmButton: false,
          timer: 1500
        })

        //Actualizar tabla
        this.ScgInversionesService.getInversiones().subscribe((resp: any) => {
          this.inversiones = resp;
        })

        //Encerar el formulario
        this.setForm();

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error en eliminar los datos!'
        })
      }

    })

  }

  public setForm() {
    this.registerForm = this.formBuilder.group({
      inputNumDep: '',
      inputNomInstit: '',
      inputFecEmis: '',
      inputFecCompra: '',
      inputTipInstr: '',
      inputPais: '',
      inputValNominal: '',
      inputValCompra: '',
      inputPerPago: '',
      inputFecVencimiento: '',
      inputCalificacionRies: '',
      inputCalificadoraRies: '',
      inputFecUltCalif: '',
      inputValLibros: '',
      inputCuentContable: '',
      inputEstadoTitulo: '',
      inputInteres: '',
      inputInteresGen: '',
      inputCalifRiesgNormativa: '',
      inputProvConst: '',
    });
  }

}


