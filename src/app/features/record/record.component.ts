import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Paciente } from '../../shared/components/models/Paciente';
import { PacienteService } from '../../service/paciente.service';
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2';



@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent {
    pacientes: Paciente [] = [];


    constructor( private router: Router, private pacienteService: PacienteService) { }

    ngOnInit(): void {
        this.obtenerTodosLosPaciente();
    };

    obtenerTodosLosPaciente(){
        this.pacienteService.obtenerTodosLosPaciente().subscribe(data => {
          this.pacientes = data;
        });
    }

    deletePaciente(id: number): void {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.pacienteService.deletePaciente(id).subscribe(data => {
                    Swal.fire('¡Eliminado!', 'El paciente ha sido eliminado.', 'success');
                    this.obtenerTodosLosPaciente();
                }, (error) => {
                    Swal.fire('¡Error!', 'Hubo un problema al eliminar el paciente.', 'error');
                });
            }
        });
    }

    editarPaciente(id: number): void {
        Swal.fire({
            title: 'Editar Paciente',
            text: 'Serás redirigido a la página de edición.',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.router.navigate(['/detail', id]);
            }
        });
    }
}
