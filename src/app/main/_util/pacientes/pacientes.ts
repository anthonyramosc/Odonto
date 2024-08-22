import { AnamnesisGeneral } from "app/main/_model/paciente/anamnesis-general";
import { Paciente } from "app/main/_model/paciente/paciente";

export const PACIENTES: Paciente[] = [
  {
    id: {
      codEmpresa: 1,
      codPaciente: 1,
    },
    codFichaPaciente: 1000,
    numIdPaciente: '1717226202',
    nomPaciente: 'Jose Luis',
    apePaciente: 'Torres Carpio',
    mailPaciente: 'mail@gmail.com',
    fecNacPaciente: '1999-01-01',
    stsPaciente: 'A',
    dirPaciente: 'Centro de la ciudad',
    telCelular: '0987654321',
  },
  {
    id: {
      codEmpresa: 1,
      codPaciente: 2,
    },
    codFichaPaciente: 1001,
    numIdPaciente: '1717226203',
    nomPaciente: 'Jose Alejandro',
    apePaciente: 'Torres Carpio',
    mailPaciente: 'mail@gmail.com',
    fecNacPaciente: '1999-01-01',
    stsPaciente: 'A',
    dirPaciente: 'Sur de la ciudad',
    telCelular: '0987654321',
  }
];

export const ANAMNESIS_GENERAL: AnamnesisGeneral[] = [
  {
    id: {
      codEmpresa: 1,
      codAnamnesis: 1,
      codPaciente: 1,
    },
    txtMotConsulta: 'Este es un motivo de consulta de ejemplo',
    txtAntMedicos: 'Ejemplo de antecedentes medicos',
    txtAlergias: 'Ejemplo de alergias',
    txtMedicamentos: 'Ejemplo de lista de medicamentos y descripcion',
    txtHabitos: 'Habitos que tiene el paciente',
    txtAntFamiliares: 'Ejemplo de antecedentes familiares',
    // txtOtros: 'Otra descripcion adicional',
    numPeso: 61.1,
    numTalla: 156,
    numImc: 5,
  },
  {
    id: {
      codEmpresa: 1,
      codAnamnesis: 1,
      codPaciente: 2,
    },
    txtMotConsulta: 'Este es un motivo de consulta de ejemplo',
    txtAntMedicos: 'Ejemplo de antecedentes medicos',
    txtAlergias: 'Ejemplo de alergias',
    txtMedicamentos: 'Ejemplo de lista de medicamentos y descripcion',
    txtHabitos: 'Habitos que tiene el paciente',
    txtAntFamiliares: 'Ejemplo de antecedentes familiares',
    // txtOtros: 'Otra descripcion adicional',
    numPeso: 61.1,
    numTalla: 156,
    numImc: 4,
  },
];


// export const ODONTOGRAMA: Odontograma[] = [
  
// ];