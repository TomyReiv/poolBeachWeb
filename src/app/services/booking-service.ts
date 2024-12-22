import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = 'bookin.json'; // Base URL para el backend

  private http = inject(HttpClient);

  // Obtener todas las reservas
  getReservas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Eliminar una reserva por ID
  deleteReserva(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Crear o editar un evento (se puede modificar para editar si el backend tiene misma ruta)
  saveEvent(event: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/events`, event); // o put si edita
  }
}
