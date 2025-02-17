import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-modal-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-auth.component.html',
  styles: ``,
})
export class ModalAuthComponent {
  @Input() showModal: boolean = false;
  @Output() modalClose = new EventEmitter<void>();
  @Output() modalOpen = new EventEmitter<void>();
  email = '';
  password = '';

  private authService = inject(AuthService);

  closeModal() {
    this.showModal = false;
  }
  openModal() {
    this.showModal = true;
  }
  login() {
    this.authService.login(this.email, this.password);
    if(this.authService.authState$) {
      this.showModal = false;
    }
  }

  loginWithGoogle() {
    console.log('Iniciar sesión con Google');
  }

  goToRegister() {
    console.log('Ir a la página de registro');
  }

}
