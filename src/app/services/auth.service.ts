import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState = new BehaviorSubject<boolean>(false);
  authState$ = this.authState.asObservable();

  private http = inject(HttpClient);

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  login(email: string, password: string) {
    return this.http
      .post(
        `${environment.apiUrlBack}api/user/login`,
        { email, password },
        { withCredentials: true }
      )
      .subscribe((res) => {
        if (isPlatformBrowser(this.platformId)) {
          try {
            localStorage.setItem('isAuthenticated', 'true');
            this.authState.next(true);
          } catch (error) {
            console.error('Error al guardar en localStorage:', error);
          }
        }
      });
  }

  checkAuth() {
    this.http
      .get<{ authenticated: boolean }>(
        `${environment.apiUrlBack}auth/check-auth`,
        {
          withCredentials: true,
        }
      )
      .subscribe((response: any) => {
        this.authState.next(response.authenticated);
        if (isPlatformBrowser(this.platformId)) {
          try {
            localStorage.setItem(
              'isAuthenticated',
              response.authenticated.toString()
            );
          } catch (e) {
            console.error('Error al guardar en localStorage:', e);
          }
        }
        return response.authenticated;
      });
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    this.authState.next(false);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}
