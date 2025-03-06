import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { BookingService } from '../../../services/booking-service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { HttpClient } from '@angular/common/http';
import { ModalAuthComponent } from '../modal-auth/modal-auth.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalAuthComponent],
  templateUrl: './admin.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  reservations: any[] = [];
  reservationsByDate: any[] = [];
  isAdmin: boolean = true;
  selectedFile: File | null = null;
  showModal: boolean = false;
  public authState: any = false;

  private bookingService = inject(BookingService);
  private adminService = inject(AdminService);
  private authService = inject(AuthService);

  ngOnInit() {
    this.adminService.bookings().subscribe((response: any) => {
      this.reservations = response.data; 
    });
    this.authService.authState$.subscribe((value) => {
      this.authState = value;
      }); 
    if (!this.authState) {
      this.showModal = true;
    }
  }

  eventForm: FormGroup;

  closeModal() {
    if (this.authState) {
      this.showModal = false;
    }
  }

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      menu: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      image: [null, Validators.required],
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  /* 
  login(username: string, password: string) {
    this.authService.login(username, password).subscribe((response: any) => {
      if(response.status === 200) {
      this.authState = true;
      this.showModal = false;
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    })
  } */

  onSubmit(): void {
    if (this.eventForm.valid) {
      try {
        if (!this.selectedFile) {
          console.error('No file selected');
          return;
        }
        const formData = new FormData();
        Object.keys(this.eventForm.controls).forEach((key) => {
          if (key !== 'image') {
            // Evitar 'image' porque se maneja aparte
            formData.append(key, this.eventForm.get(key)?.value);
          }
        });

        // Agregar el archivo correctamente
        if (this.selectedFile) {
          formData.append('image', this.selectedFile, this.selectedFile.name);
        }

        this.adminService.sendEvent(formData).subscribe((response: any) => {
          
          if (response.status === 200) {
            alert('Evento creado exitosamente');
            this.eventForm.reset();
            this.selectedFile = null;
          } else {
            alert('Error al crear evento. Inténtalo de nuevo.');
          }
        });
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
    this.adminService.bookings().subscribe((data: any) => {
      data.sort((a: any, b: any) => a.date - b.date);
      this.reservations = data.data;
      this.groupReservationsByDate();
    });
  }

  deleteReservation(id: string) {
    
    if (confirm('¿Estás seguro de que deseas eliminar esta reserva?')) {
      this.adminService.deleteBooking(id).subscribe(() => {
        this.loadReservations(); // Recargar datos
      });
    }
  }
}
