export class Paciente {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  direccion: string;
  rut: string;
  critico: boolean;
  fechaIngreso: Date;
  fechaNacimiento: Date;
  descripcionIngreso: string;
  fechaEgreso: Date;

  constructor(data: any) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.apellido = data.apellido;
    this.edad = data.edad;
    this.direccion = data.direccion;
    this.rut = data.rut;
    this.critico = data.critico;
    this.fechaIngreso = data.fechaIngreso;
    this.fechaNacimiento = data.fechaNacimiento;
    this.descripcionIngreso = data.descripcionIngreso;
    this.fechaEgreso = data.fechaEgreso;
  }
}

export class Pacientes {
  nombre: string;
  apellido: string;
  edad: number;
  direccion: string;
  rut: string;
  critico: boolean;
  fechaIngreso: Date;
  fechaNacimiento: Date;
  descripcionIngreso: string;
  fechaEgreso: Date;

  constructor(data: any) {
    this.nombre = data.nombre;
    this.apellido = data.apellido;
    this.edad = data.edad;
    this.direccion = data.direccion;
    this.rut = data.rut;
    this.critico = data.critico;
    this.fechaIngreso = data.fechaIngreso;
    this.fechaNacimiento = data.fechaNacimiento;
    this.descripcionIngreso = data.descripcionIngreso;
    this.fechaEgreso = data.fechaEgreso;
  }
}
