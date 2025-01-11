export class SignosVitales {
    id_paciente: number;
    temperatura: number;
    frecuenciaCardiaca: number;
    presionArterial: string;
    saturacionOxigeno: number;
    fechaRegistro: string;
  
    constructor(data: any) {
        this.id_paciente = data.id_paciente;
        this.temperatura = data.temperatura;
        this.frecuenciaCardiaca = data.frecuenciaCardiaca;
        this.presionArterial = data.presionArterial;
        this.saturacionOxigeno = data.saturacionOxigeno;
        this.fechaRegistro = data.fechaRegistro;
    }
  }