import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroDacionPagoService } from './registro-dacion-pago.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-registro-dacion-pago',
  templateUrl: './registro-dacion-pago.component.html',
  styleUrls: ['./registro-dacion-pago.component.scss']
})
export class RegistroDacionPagoComponent implements OnInit {

  //Forms
  registerForm: FormGroup;
  submitted = false;

  //Datos formulario Completo
  public dacionesPagos: Array<any> = []

  //Filtros para tabla
  filternumop = "";
  filterid = "";
  filtertipobien = "";
  filternomemisor = "";
  filterfecemision = "";
  filtervalor = "";

  //Json to Send
  dataDacionPago: any;

  //Datos Estaticos - revisar
  listaTipoId = [
    {
      "cod": "C",
      "nom": "Para personas naturales identificadas con la cédula de identidad o ciudadanía",
    },
    {
      "cod": "R",
      "nom": "Para personas jurídicas identificadas con el número de RUC",
    },
    {
      "cod": "P",
      "nom": "Para personas naturales con pasaporte ",
    },
    {
      "cod": "F",
      "nom": "Para refugiados",
    },
    {
      "cod": "X",
      "nom": "Para entidades extranjeras (aplica solo para inversiones y fondos disponibles de entidades del Segmento 1, 2 y 3)",
    }
  ];

  listaTipoBien = [
    {
      "cod": "110",
      "nom": "TERRENOS",
    },
    {
      "cod": "120",
      "nom": "EDIFICACIONES",
    },
    {
      "cod": "230",
      "nom": "MAQUINARIA Y EQUIPOS",
    },
    {
      "cod": "240",
      "nom": "UNIDADES DE TRANSPORTE",
    },
    {
      "cod": "250",
      "nom": "OTROS",
    },
    {
      "cod": "350",
      "nom": "ACCIONES Y PARTICIPACIONE",
    },
  ];

  listaEstadoRegistro = [
    {
      "cod": "A",
      "nom": "ACTUALIZACIÓN"
    },
    {
      "cod": "D",
      "nom": "HABILITADA O DESBLOQUEADA (De uso exclusivo para tarjetas de créditos)"
    },
    {
      "cod": "E",
      "nom": "ELIMINACIÓN (Para la estructura C05, este código indica que la tarjeta de crédito se encuentra suspe"
    },
    {
      "cod": "N",
      "nom": "NUEVO"
    },
    {
      "cod": "R",
      "nom": "REPOSICIÓN (De uso exclusivo para tarjetas de créditos)"
    }
  ]

  seleccionadoCodId: string;
  seleccionadoTipoBien: string;
  seleccionadoEstadoReg: string;

  constructor(
    private DacionPagoService: RegistroDacionPagoService,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit() {

    //Current user
    // const session = JSON.parse(localStorage.getItem('currentUser'));
    // console.log('Session de usuario: ', session)
    // this.DacionPagoService.getSessionUsuarioActual(session.token) ..continue

    //Inicia con datos en tabla
    this.DacionPagoService.getDacionesPagos().subscribe((resp: any) => {
      this.dacionesPagos = resp;
      console.log(resp);
    })

    //Validar Formulario
    this.registerForm = this.formBuilder.group({
      inputNumOp: ['', Validators.required],
      inputTipoId: ['', Validators.required],
      inputNumId: ['', Validators.required],
      inputCodBien: ['', Validators.required],
      inputTipoBien: ['', Validators.required],
      inputNomEmisor: ['', Validators.required],
      inputFecEmision: ['', Validators.required],
      inputFecVencimiento: ['', Validators.required],
      inputValNominal: ['', Validators.required],
      inputFecCont: ['', Validators.required],
      inputValLibros: ['', Validators.required],
      inputValUltAval: ['', Validators.required],
      inputValProvCons: ['', Validators.required],
      inputFecRealiz: ['', Validators.required],
      inputValReali: ['', Validators.required],
      inputEstadoReg: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  //Cargar datos a Postgres
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    // console.log(this.registerForm.value) //muestra contenido de form completo

    //Arregla ingresod e dato fecha a la base
    var getfechaEmision = new Date(this.registerForm.value.inputFecEmision);
    getfechaEmision.setDate(getfechaEmision.getDate() + 2); //dias para agregar a la base
    var fechEmis = getfechaEmision.toLocaleDateString().split("/");
    var fechEmisSet = fechEmis[2] + "-" + fechEmis[1] + "-" + fechEmis[0];

    var getfechaVencim = new Date(this.registerForm.value.inputFecVencimiento);
    getfechaVencim.setDate(getfechaVencim.getDate() + 2); //dias para agregar a la base
    var fechVenc = getfechaVencim.toLocaleDateString().split("/");
    var fechVencSet = fechVenc[2] + "-" + fechVenc[1] + "-" + fechVenc[0];

    var getfechaCont = new Date(this.registerForm.value.inputFecCont);
    getfechaCont.setDate(getfechaCont.getDate() + 2); //dias para agregar a la base
    var fechCont = getfechaCont.toLocaleDateString().split("/");
    var fechContSet = fechCont[2] + "-" + fechCont[1] + "-" + fechCont[0];

    var getfechaRealiz = new Date(this.registerForm.value.inputFecRealiz);
    getfechaRealiz.setDate(getfechaRealiz.getDate() + 2); //dias para agregar a la base
    var fechReali = getfechaRealiz.toLocaleDateString().split("/");
    var fechRealiSet = fechReali[2] + "-" + fechReali[1] + "-" + fechReali[0];


    this.dataDacionPago = {
      numOperacion: this.registerForm.value.inputNumOp, //"44444"
      tipoIdentificacionSujeto: this.registerForm.value.inputTipoId,
      idSujeto: this.registerForm.value.inputNumId,
      codBienTitulo: this.registerForm.value.inputCodBien,
      codTipoBien: parseInt(this.registerForm.value.inputTipoBien),
      nombreEmisor: this.registerForm.value.inputNomEmisor,
      fecEmision: fechEmisSet,
      fecVencimiento: fechVencSet,
      valNominal: parseFloat(this.registerForm.value.inputValNominal),
      fecContabilizacion: fechContSet,
      valLibros: parseFloat(this.registerForm.value.inputValLibros),
      valUltimoAvaluo: parseFloat(this.registerForm.value.inputValUltAval),
      valProvisionConstituida: parseFloat(this.registerForm.value.inputValProvCons),
      fecRealizacion: fechRealiSet,
      valRealizacion: parseFloat(this.registerForm.value.inputValReali),
      codEstado: this.registerForm.value.inputEstadoReg
    }

    console.log(this.dataDacionPago)

    // Enviar al backend -- Funcionando!!
    this.DacionPagoService.postDacionesPago(this.dataDacionPago).subscribe((resp: any) => {
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
        this.DacionPagoService.getDacionesPagos().subscribe((resp: any) => {
          this.dacionesPagos = resp;
          console.log(resp);
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

    })

  }

  public setForm() {
    this.registerForm = this.formBuilder.group({
      inputNumOp: '',
      inputTipoId: '',
      inputNumId: '',
      inputCodBien: '',
      inputTipoBien: '',
      inputNomEmisor: '',
      inputFecEmision: '',
      inputFecVencimiento: '',
      inputValNominal: '',
      inputFecCont: '',
      inputValLibros: '',
      inputValUltAval: '',
      inputValProvCons: '',
      inputFecRealiz: '',
      inputValReali: '',
      inputEstadoReg: '',
    });
  }

}
