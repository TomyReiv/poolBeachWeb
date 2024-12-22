import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking-service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup,  ReactiveFormsModule,  Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './admin.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  reservations: any[] = [];
  reservationsByDate: any[] = [];
  isAdmin: boolean = true;

  private bookingService = inject(BookingService);

  ngOnInit() {
    this.loadReservations();
    console.log('Es admin?: ',this.isAdmin);
    
  }

  eventForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      menu: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      booking: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const newEvent = this.eventForm.value;
      try {
        alert('Evento creado exitosamente');
        this.eventForm.reset();
        this.loadReservations();
      } catch (error) {
        console.error('Error al crear evento:', error);
        alert('Error al crear evento. Inténtalo de nuevo.');
      }
    } else {
      alert(
        'Por favor, completa todos los campos del formulario correctamente.'
      );
    }
  }

  groupReservationsByDate() {
    this.reservationsByDate = this.reservations.reduce((groups, reserva) => {
      const date = reserva.reservationDate; // O la propiedad que corresponda
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(reserva);
      return groups;
    }, {});
  }

  loadReservations() {
    this.bookingService.getReservas().subscribe((data) => {
      data.sort((a, b) => a.date - b.date);
      this.reservations = data;
      this.groupReservationsByDate();
    });
  }

  deleteReservation(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta reserva?')) {
      this.bookingService.deleteReserva(id).subscribe(() => {
        this.loadReservations(); // Recargar datos
      });
    }
  }
}
