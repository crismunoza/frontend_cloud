import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignosVitales } from 'src/app/shared/components/models/SignosVitales';
import { SignosVitalesService } from 'src/app/service/signos-vitales.service'; // Importar el servicio
import Swal from 'sweetalert2'; // Importar SweetAlert2

@Component({
  selector: 'app-signs',
  templateUrl: './signs.component.html',
  styleUrls: ['./signs.component.css']
})
export class SignsComponent implements OnInit {
  vitalSigns: SignosVitales;

  constructor(private router: Router, private route: ActivatedRoute, private signosService: SignosVitalesService) { // Inyectar el servicio
    this.vitalSigns = new SignosVitales({
      id_paciente: 0, // Se inicializa como 0, luego se sobrescribe con el parámetro de la URL
      temperatura: 0,
      frecuenciaCardiaca: 0,
      presionArterial: '',
      saturacionOxigeno: 0,
      fechaRegistro: this.getTodayDate()
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.vitalSigns.id_paciente = +params['id']; 
    });
  }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  onSubmit() {
    this.signosService.createSignosVitales(this.vitalSigns.id_paciente, this.vitalSigns)
      .subscribe({
        next: (data) => {
            console.log('Signos vitales guardados:', data);
          Swal.fire(
            'Éxito','Signos vitales guardados exitosamente.','success'

          ).then(() => {
            this.router.navigate(['/history/' + this.vitalSigns.id_paciente]);
          });
        },
        error: (error) => {
          Swal.fire(
            'Error', 'Hubo un problema al guardar los signos vitales.', 'error'
          );
        }
      });
  }
}
