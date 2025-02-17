import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);

  login(username: string, password: string) {
    return this.http
      .post(
        `${environment.apiUrlBack}api/user/login`,
        { username, password },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
  }

  bookings() {
    return this.http
      .get(`${environment.apiUrlBack}api/booking`, {
        withCredentials: true
      })
  }
  sendEvent(event: any) {
    const formData = new FormData();
  
    formData.append("title", event.get("title"));
    formData.append("description", event.get("description"));
    formData.append("date", event.get("date"));
    formData.append("menu", event.get("menu"));
    formData.append("price", event.get("price"));
  
    const imageFile = event.get("image");
    console.log('imageFile:', imageFile);
    if (imageFile) {
      formData.append("image", imageFile);
    }
  
    return this.http.post(`${environment.apiUrlBack}api/event`, formData, {
      withCredentials: true,
    });
  }
  
}
