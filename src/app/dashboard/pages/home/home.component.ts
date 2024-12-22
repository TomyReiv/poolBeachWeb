import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import {  inject } from '@angular/core';
import { UsHomeComponent } from '../home-components/us-home/us-home.component';
import { InfoHomeComponent } from "../home-components/info-home/info-home.component";
import ContactComponent from '../home-components/contact/contact.component';
import { ParallaxComponent } from '../home-components/parallax/parallax.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../home-components/header/header.component';
import { ActivitiesComponent } from '../home-components/activities/activities.component';
import { CarruselComponent } from '../home-components/carrusel/carrusel.component';
import { ModalComponent } from '../home-components/modal/modal.component';
import { EventsService } from '../../../services/events.service';

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
    ActivitiesComponent,
    CarruselComponent,
    ModalComponent
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

  showModal: boolean = false;
  eventData: { title: string; description: string; image: string, date: Date, menu:String, price:Number, booking:String } = {
    title: '',
    description: '',
    image: '',
    date: new Date(),
    menu: '',
    price: 0,
    booking: ''
  };

  private eventService = inject(EventsService);

  ngOnInit() {
    this.checkForEvent();
  }

  checkForEvent() {
    this.eventService.getEvents().subscribe((events: any) => {
      if (events.length > 0) {
        this.eventData = events[0];
        this.showModal = true;
      }
    });
  }

  closeModal() {
    this.showModal = false;
  }
}
