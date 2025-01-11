import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pacientes } from '../shared/components/models/Paciente';
import { Paciente } from '../shared/components/models/Paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = 'https://qomnjoq14k.execute-api.us-east-1.amazonaws.com/pacientes'; 

  constructor(private http: HttpClient) { }


  obtenerTodosLosPaciente(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}`);
  }

  deletePaciente(id: number): Observable<any[]> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
 
  editPaciente(paciente: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${paciente.id}`, paciente);
  }
 
  registrarPaciente(pacientes: Pacientes): Observable<any> {
    console.log('Paciente:', pacientes)
    return this.http.post<any>(`${this.apiUrl}`, pacientes);
  }

  obtenerPacientePorId(id: number): Observable<Paciente> {
    console.log('ID:', id)
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`);
  }
  
}