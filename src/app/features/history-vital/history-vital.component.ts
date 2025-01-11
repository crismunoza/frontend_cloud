import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignosVitalesService } from '../../service/signos-vitales.service';
import { SignosVitales } from '../../shared/components/models/SignosVitales';

@Component({
  selector: 'app-history-vital',
  templateUrl: './history-vital.component.html',
  styleUrls: ['./history-vital.component.css']
})
export class HistoryVitalComponent implements OnInit {

  signosVitales: SignosVitales[] = [];

  constructor(
    private route: ActivatedRoute,
    private signosVitalesService: SignosVitalesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getSignosVitalesByPaciente(id);
      console.log(id);
  })
  }

  getSignosVitalesByPaciente(id: number): void {
    this.signosVitalesService.getSignosVitalesByPaciente(id).subscribe((data) => {
      this.signosVitales = data;
      console.log(data);
    });
  }
}
