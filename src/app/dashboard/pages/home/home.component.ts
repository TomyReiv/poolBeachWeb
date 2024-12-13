import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import {  inject } from '@angular/core';
import { UsHomeComponent } from '../us-home/us-home.component';
import { InfoHomeComponent } from "../info-home/info-home.component";
import ContactComponent from '../contact/contact.component';
import { ParallaxComponent } from '../parallax/parallax.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ActivitiesComponent } from '../activities/activities.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    UsHomeComponent,
    HeaderComponent,
    InfoHomeComponent,
    ContactComponent,
    ParallaxComponent,
    FooterComponent,
    ActivitiesComponent
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
