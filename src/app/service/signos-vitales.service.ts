import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignosVitales } from '../shared/components/models/SignosVitales';

@Injectable({
  providedIn: 'root'
})
export class SignosVitalesService {

  private apiUrl = 'https://qomnjoq14k.execute-api.us-east-1.amazonaws.com/signosvitales';

  constructor(private http: HttpClient) { }

  // Obtener todos los signos vitales
  getAllSignosVitales(): Observable<SignosVitales[]> {
    return this.http.get<SignosVitales[]>(this.apiUrl);
  }

  // Obtener signos vitales por ID
  getSignosVitalesById(id: number): Observable<SignosVitales> {
    return this.http.get<SignosVitales>(`${this.apiUrl}/${id}`);
  }

  // Crear signos vitales asociados a un paciente
  createSignosVitales(pacienteId: number, signos: SignosVitales): Observable<SignosVitales> {
    return this.http.post<SignosVitales>(`${this.apiUrl}/${pacienteId}`, signos);
  }

  // Actualizar signos vitales
  updateSignosVitales(id: number, signos: SignosVitales): Observable<SignosVitales> {
    return this.http.put<SignosVitales>(`${this.apiUrl}/${id}`, signos);
  }

  // Eliminar signos vitales
  deleteSignosVitales(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener signos vitales de un paciente específico
  getSignosVitalesByPaciente(pacienteId: number): Observable<SignosVitales[]> {
    return this.http.get<SignosVitales[]>(`https://qomnjoq14k.execute-api.us-east-1.amazonaws.com/signosvitalespaciente/${pacienteId}`);
  }
}
