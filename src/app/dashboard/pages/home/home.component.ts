import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { UsHomeComponent } from '../home-components/us-home/us-home.component';
import { InfoHomeComponent } from '../home-components/info-home/info-home.component';
import ContactComponent from '../home-components/contact/contact.component';
import { ParallaxComponent } from '../home-components/parallax/parallax.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../home-components/header/header.component';
import { ActivitiesComponent } from '../home-components/activities/activities.component';
import { CarruselComponent } from '../home-components/carrusel/carrusel.component';
import { ModalComponent } from '../home-components/modal/modal.component';
import { EventsService } from '../../../services/events.service';
import { MenuComponent } from '../../../shared/menu/menu.component';

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
    ModalComponent,
    MenuComponent,
  ],
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  redirectTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }

  showModal: boolean = false;
  eventData: {
    title: string;
    description: string;
    image: string;
    date: string;
    menu: String;
    price: Number;
    phone: String;
  } = {
    title: '',
    description: '',
    image: '',
    date: '',
    menu: '',
    price: 0,
    phone: '',
  };

  private eventService = inject(EventsService);

  ngOnInit() {
    this.checkForEvent();
  }

  checkForEvent() {
    this.eventService.getEvents().subscribe((events: any) => {
      if (events.data.length > 0) {
        this.eventData = events.data[events.data.length - 1];
        const fechaObjeto = new Date(this.eventData.date);
        const fechaString = fechaObjeto.toISOString().split('T')[0];
        this.eventData.date = fechaString;

        this.showModal = true;
        /* this.cdr.detectChanges(); */
      }
    });
  }

  closeModal() {
    this.showModal = false;
  }
}
