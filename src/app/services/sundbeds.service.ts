import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SundbedsService {
  private http = inject(HttpClient);
  private readonly url: string = environment.apiUrlBack;

  getSundbeds(date:any): Observable<any> {

    return this.http.get(`${this.url}api/sunbed?date=${date}`);
  }
}
