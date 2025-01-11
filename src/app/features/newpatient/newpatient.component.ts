import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pacientes } from '../../shared/components/models/Paciente';
import { PacienteService } from '../../service/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newpatient',
  templateUrl: './newpatient.component.html',
  styleUrls: ['./newpatient.component.css']
})
export class NewpatientComponent {
    paciente: Pacientes = { 
        nombre: '',
        apellido: '',
        edad: 0,
        direccion: '',
        rut: '',
        critico: true,
        fechaNacimiento: new Date(),
        descripcionIngreso: '',
        fechaIngreso: new Date(),
        fechaEgreso: new Date()
    };

    constructor(private router: Router, private pacienteService: PacienteService) { }

    getTodayDate(): string {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    onSubmit() {
        if (this.validatePaciente()) {
            this.pacienteService.registrarPaciente(this.paciente).subscribe(
                response => {
                    console.log('Paciente guardado:', response);
                    Swal.fire('Éxito', 'Paciente registrado exitosamente.', 'success').then(() => {
                        this.router.navigate(['/home']);
                    }
                    );
                },
                error => {
                    console.error('Error al guardar el paciente:', error);
                    Swal.fire('Error', 'Hubo un error al registrar el paciente.', 'error');
                }
            );
        } else {
            console.log('Errores de validación en el formulario.');
        }

    }

    validatePaciente(): boolean {
        if (this.paciente.fechaEgreso && this.paciente.fechaIngreso) {
            if (new Date(this.paciente.fechaEgreso) < new Date(this.paciente.fechaIngreso)) {
                Swal.fire('¡Error!', 'La fecha de egreso no puede ser anterior a la fecha de ingreso.', 'error');
                return false;
            }
        }
        const rutPattern = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/;
        if (this.paciente.rut && !rutPattern.test(this.paciente.rut)) {
            Swal.fire('¡Error!', 'El RUT debe tener el formato XX.XXX.XXX-X.', 'error');
            return false;
        }

        if (!this.paciente.nombre || !this.paciente.apellido || !this.paciente.rut || !this.paciente.fechaNacimiento) {
            Swal.fire('¡Error!', 'Todos los campos obligatorios deben ser completos.', 'error');
            return false;
        }

        return true;
    }
}
