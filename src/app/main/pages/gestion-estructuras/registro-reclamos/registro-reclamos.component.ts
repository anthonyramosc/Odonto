import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { RegistroReclamosService } from './registro-reclamos.service';

@Component({
  selector: 'app-registro-reclamos',
  templateUrl: './registro-reclamos.component.html',
  styleUrls: ['./registro-reclamos.component.scss']
})
export class RegistroReclamosComponent implements OnInit {

  //Values front
  numReclamo: number; //temp
  
  //Datos formulario Completo
  public reclamos: Array<any> = []

  //Forms
  registerForm: FormGroup;
  submitted = false;

  //Json to Send
  dataReclamo: any;

  //Select Data
  listaTipoReclamo = [
    {
      "cod": "NC",
      "desc": "Nacional"
    },
    {
      "cod": "IN",
      "desc": "Internacional"
    },
  ];

  listaCanalReclamo = [
    {
      "cod": "P",
      "desc": "Presencial"
    },
    {
      "cod": "T",
      "desc": "Telefónico"
    }
  ];

  listaEstadoReclamo = [
    {
      "cod": 1,
      "desc": "En Trámite"
    },
    {
      "cod": 2,
      "desc": "Resuelto"
    }
  ];

  listaTipoResRec = [
    {
      "cod": "FU",
      "desc": "Favorable para el socio o cliente"
    },
    {
      "cod": "DU",
      "desc": "Desfavorable para el socio o cliente"
    },
    {
      "cod": "PU",
      "desc": "Parcialmente a favor del socio o cliente"
    },
    {
      "cod": "DS",
      "desc": "Desistimiento del socio o cliente"
    }
  ];

  listaTipoConcepto = [
    {
      "cod": 1,
      "desc": "1 - Obligaciones con el público: Cuentas de ahorros/cuenta básica/Depósitos a plazo fijo"
    },
    {
      "cod": 2,
      "desc": "2 - Cartera de crédito"
    },
  ];

  listaDetConcepto = [
    {
      "cod": "OP01",
      "desc": "1.1 - Cargos por servicios financieros básicos "
    },
    {
      "cod": "OP02",
      "desc": "1.2 - Servicios financieros con cargos máximos cuyo cobro excede el límite establecido en la norma"
    },
    {
      "cod": "OP03",
      "desc": "1.3 - Servicios financieros con cargo diferenciado cuyo cobro excede el valor aprobado"
    },
    {
      "cod": "OP04",
      "desc": "1.4 - Cobros por consumos no autorizados con tarjeta de débito"
    },
    {
      "cod": "OP05",
      "desc": "1.5 - Cargos en servicios no financieros* que exceden los valores facturados por el prestador del servicio"
    },
    {
      "cod": "OP06",
      "desc": "1.6 - Cobros por servicios no financieros* que no estén autorizados"
    },
    {
      "cod": "OP07",
      "desc": "1.7 - Descuentos no autorizados en capital o intereses de certificados de depósitos a plazo fijo"
    },
    {
      "cod": "CC01",
      "desc": "2.1 - Cargos por servicios financieros básicos"
    },
    {
      "cod": "CC02",
      "desc": "2.2 - Servicios financieros con cargos máximos cuyo cobro excede el límite establecido en la norma"
    },
    {
      "cod": "CC03",
      "desc": "2.3 - Servicios financieros con cargo diferenciado cuyo cobro excede el valor aprobado"
    },
    {
      "cod": "CC04",
      "desc": "2.4 - Cargos en servicios no financieros* que exceden los valores facturados por el prestador del servicio "
    },
    {
      "cod": "CC05",
      "desc": "2.5 - Cobros por servicios no financieros* que no estén autorizados "
    },
    {
      "cod": "CC06",
      "desc": "2.6 - Comisiones o cargos no autorizados en operaciones de crédito "
    },
    {
      "cod": "CC07",
      "desc": "2.7 - Crédito no autorizado"
    },
    {
      "cod": "CC08",
      "desc": "2.8 - Falta de registro en pagos de la operación por parte de la entidad"
    },
    {
      "cod": "CC09",
      "desc": "2.9 - Imposición de castigos por pagos anticipados o negativa a recibir y registrar pagos anticipados "
    },
    {
      "cod": "CC10",
      "desc": "2.10 - Anatocismo "
    },
    {
      "cod": "CC11",
      "desc": "2.11 - Cobros por intereses no devengados o superiores a los máximos vigentes "
    },

  ]

  seleccionadoCanalReclamo: string;
  seleccionadoTipoTran: string;
  seleccionadoEstadoRec: string;
  seleccionadoTipoResRec: string;
  seleccionadoTipoConcepto: string;
  seleccionadoDetConcepto: string;

  flagUpdateReclamo = false;

  constructor(
    private SgfReclamosService: RegistroReclamosService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    //Inicia con datos en tabla
    this.SgfReclamosService.getReclamos().subscribe((resp: any) => {
      this.reclamos = resp;

      if (this.reclamos.length != 0) {
        this.numReclamo = this.reclamos[this.reclamos.length-1].id.numReclamo +1
        console.log(this.numReclamo);
      } else {
        this.numReclamo = 1
      }
    })
    

    //Validar Formulario
    this.registerForm = this.formBuilder.group({
      inputNumReclamo: [''],
      inputCodSocio: ['', Validators.required],
      inputCanalRec: ['', Validators.required],
      inputFecReclamo: ['', Validators.required],
      inputTipoTransaccion: ['', Validators.required],
      inputEstadoReclamo: ['', Validators.required],
      inputFecRespRec: ['', Validators.required],
      inputTipoResRec: ['', Validators.required],
      inputValResti: ['', Validators.required],
      inputValIntRest: ['', Validators.required],
      inputValTot: ['', Validators.required],
      inputTipoConcepto: ['', Validators.required],
      inputDetConcepto: ['', Validators.required],
    });
  }

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

    var getfechaRec = new Date(this.registerForm.value.inputFecReclamo);
    getfechaRec.setDate(getfechaRec.getDate() + 2); //dias para agregar a la base ==============
    // getfechaRec.setDate(getfechaRec.getDate()); //sin dias para agregar a la base

    // console.log("DATE1: "+this.registerForm.value.inputFecReclamo)
    // console.log("DATE2+2: "+getfechaRec)

    
    var fechRec = getfechaRec.toLocaleDateString().split("/");
    var fechRecSet = fechRec[2]+"-"+fechRec[1]+"-"+fechRec[0];

    var getfechaRespRec = new Date(this.registerForm.value.inputFecRespRec);
    getfechaRespRec.setDate(getfechaRespRec.getDate() + 2); //dias para agregar a la base ==============
    // getfechaRespRec.setDate(getfechaRespRec.getDate()); //No necesario +2 dias
    var fechRespRec = getfechaRespRec.toLocaleDateString().split("/");
    var fechRespRecSet = fechRespRec[2]+"-"+fechRespRec[1]+"-"+fechRespRec[0];

    this.dataReclamo = {
      id: {
        numReclamo: this.registerForm.value.inputNumReclamo,
        codSocio: this.registerForm.value.inputCodSocio,
      },
      canalReclamo: this.registerForm.value.inputCanalRec,
      fecReclamo: fechRecSet,
      tipoTransaccion: this.registerForm.value.inputTipoTransaccion,
      concepto: this.registerForm.value.inputDetConcepto,
      stsReclamo: this.registerForm.value.inputEstadoReclamo,
      fecRespuestaReclamo: fechRespRecSet,
      tipoResolucionReclamo: this.registerForm.value.inputTipoResRec,
      valRestituido: this.registerForm.value.inputValResti,
      valInteresRestituido: this.registerForm.value.inputValIntRest,
      valTotalRestituido: this.registerForm.value.inputValTot
    }

    console.log('Create / Update')
    console.log(this.dataReclamo)

    if (this.flagUpdateReclamo) {
      // Update
      this.SgfReclamosService.updReclamos(this.dataReclamo).subscribe((resp: any) => {
      // console.log(resp);
      if (resp.status == 0) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Actualizacion de datos exitoso',
          showConfirmButton: false,
          timer: 1500
        })

        //Si es correcto, actualiza tabla
        this.SgfReclamosService.getReclamos().subscribe((resp: any) => {
          this.reclamos = resp;
          console.log(resp)
          if (this.reclamos.length != 0) {
            this.numReclamo = this.reclamos[this.reclamos.length-1].id.numReclamo +1
            console.log(this.numReclamo);
          } else {
            this.numReclamo = 1
          }
        })

        //Reset Form inputs
        this.submitted = false;
        this.setForm();
        //Reset Form inputs

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error en actualizar los datos!\n'+resp.message
        })
      }
    })
    this.flagUpdateReclamo = false;
    } else {
      // Create
      this.SgfReclamosService.postReclamos(this.dataReclamo).subscribe((resp: any) => {
        console.log(resp);

        if (resp.status == 0) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro de datos exitoso',
            showConfirmButton: false,
            timer: 1500
          })

          //Si es correcto, actualiza tabla
          this.SgfReclamosService.getReclamos().subscribe((resp: any) => {
            this.reclamos = resp;
            console.log(resp)
            if (this.reclamos.length != 0) {
              this.numReclamo = this.reclamos[this.reclamos.length-1].id.numReclamo +1
              console.log(this.numReclamo);
            } else {
              this.numReclamo = 1
            }
          })

          //Reset Form inputs
          this.submitted = false;
          this.setForm();
          //Reset Form inputs

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error en almacenar los datos!\n'+resp.message
          })
        }
      })
    }

  }

  onSelectUpdate(reclamo){

    Swal.fire({
      icon: 'warning',
      title: 'Aviso',
      text: 'Actualiacion de Reclamo N° '+reclamo.id.numReclamo
    })

    this.flagUpdateReclamo = true;
    console.log(reclamo);
    //Update Form inputs
    this.submitted = false;
    this.updateForm(reclamo);
    //Update Form inputs
  }

  eliminar(reclamo){
    console.log(reclamo); //Get reclamo selected
    this.SgfReclamosService.delReclamos(reclamo).subscribe((resp: any) => {
      console.log(resp);

      if (resp.status == 0) {
        Swal.fire({
          icon: 'success',
          title: 'Aviso',
          text: 'Registro eliminado correctamente!'
        })
        
        //Si es correcto, actualiza tabla
        this.SgfReclamosService.getReclamos().subscribe((resp: any) => {
          this.reclamos = resp;
          if (this.reclamos.length != 0) {
            this.numReclamo = this.reclamos[this.reclamos.length-1].id.numReclamo +1
            console.log(this.numReclamo);
          } else {
            this.numReclamo = 1
          }
        })

        //Reset Form inputs
        this.submitted = false;
        this.setForm();
        //Reset Form inputs

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error en eliminar el reclamo!\n'+resp.message
        })
      }

    })

  }

  public setForm(){
    this.registerForm = this.formBuilder.group({
      inputNumReclamo: this.numReclamo,
      inputCodSocio: ['', Validators.required],
      inputCanalRec: ['', Validators.required],
      inputFecReclamo: ['', Validators.required],
      inputTipoTransaccion: ['', Validators.required],
      inputEstadoReclamo: ['', Validators.required],
      inputFecRespRec: ['', Validators.required],
      inputTipoResRec: ['', Validators.required],
      inputValResti: ['', Validators.required],
      inputValIntRest: ['', Validators.required],
      inputValTot: ['', Validators.required],
      inputTipoConcepto: ['', Validators.required],
      inputDetConcepto: ['', Validators.required],
    });
  }

  public updateForm(reclamo){
    this.registerForm = this.formBuilder.group({
      inputNumReclamo: reclamo.id.numReclamo,
      inputCodSocio: reclamo.id.codSocio,
      inputCanalRec: reclamo.canalReclamo,
      inputFecReclamo: reclamo.fecReclamo,
      inputTipoTransaccion: reclamo.tipoTransaccion,
      inputEstadoReclamo: reclamo.stsReclamo,
      inputFecRespRec: reclamo.fecRespuestaReclamo,
      inputTipoResRec: reclamo.tipoResolucionReclamo,
      inputValResti: reclamo.valRestituido,
      inputValIntRest: reclamo.valInteresRestituido,
      inputValTot: reclamo.valTotalRestituido,
      inputTipoConcepto: ['', Validators.required],
      inputDetConcepto: reclamo.concepto,
    });
  }
}
