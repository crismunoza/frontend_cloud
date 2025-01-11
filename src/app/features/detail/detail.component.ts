import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pacientes } from '../../shared/components/models/Paciente';
import { PacienteService } from '../../service/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

    constructor(private route: ActivatedRoute, private pacienteService: PacienteService) { }

    editMode: boolean = false;
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

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = params['id'];
            this.obtenerPacientePorId(id);
        });
    }

    obtenerPacientePorId = (id: number) => {
        this.pacienteService.obtenerPacientePorId(id).subscribe((resp: Pacientes) => {
            this.paciente = resp;
            console.log('Paciente:  traido con id', this.paciente);
        });
    }

    toggleEditMode() {
        this.editMode = !this.editMode;
    }

    updatePaciente() {
        if (this.validatePaciente()) {
            this.pacienteService.editPaciente(this.paciente).subscribe((response) => {
                Swal.fire('¡Éxito!', 'Paciente actualizado correctamente.', 'success');
                this.editMode = false;
            }, (error) => {
                Swal.fire('¡Error!', 'Hubo un problema al actualizar el paciente.', 'error');
            });
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
