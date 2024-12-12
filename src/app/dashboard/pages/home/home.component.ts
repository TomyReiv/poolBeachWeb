import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { Router } from '@angular/router';
import {  inject } from '@angular/core';
import { UsHomeComponent } from '../us-home/us-home.component';
import { InfoHomeComponent } from "../info-home/info-home.component";
import ContactComponent from '../contact/contact.component';
import { ParallaxComponent } from '../parallax/parallax.component';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    UsHomeComponent,
    InfoHomeComponent,
    ContactComponent,
    ParallaxComponent,
    FooterComponent
],
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent { 
  private router = inject(Router)

  redirectTo(path: string): void {
    this.router.navigate([`/dashboard/${path}`]);
  }
}
