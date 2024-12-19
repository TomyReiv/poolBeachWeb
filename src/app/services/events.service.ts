import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private http = inject(HttpClient);
  private readonly cartUrl: string = environment.apiUrl;

  getEvents(): Observable<any>{
    const url = environment.apiUrl;
    return this.http.get(url)
  }
}
