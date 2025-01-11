import { Component,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Paciente } from '../../shared/components/models/Paciente';
import { PacienteService } from '../../service/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    pacientes: Paciente [] = [];

  constructor(private pacienteService: PacienteService) { }

    ngOnInit(): void {
     this.obtenerTodosLosPaciente();
    };
   
    obtenerTodosLosPaciente(){
      this.pacienteService.obtenerTodosLosPaciente().subscribe(data => {
        this.pacientes = data;
      });
    }
}
