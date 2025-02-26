import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {  inject } from '@angular/core';
import { ButtonComponent } from '../../../../shared/button/button.component';

@Component({
  selector: 'app-us-home',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './us-home.component.html',
  styles: ``
})
export class UsHomeComponent {
  private router = inject(Router)

  redirectTo(path: string): void {
   window.location.href = `/${path}`;
  }
}
