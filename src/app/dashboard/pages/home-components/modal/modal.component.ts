import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './modal.component.html',
  styles: ``
})
export class ModalComponent {
  @Input() eventData: { title: string; description: string; image: string, date: Date, menu:String, price:Number, booking:String } = {
    title: '',
    description: '',
    image: '',
    date: new Date(),
    menu: '',
    price: 0,
    booking: ''
  };
  @Input() showModal: boolean = false;
  @Output() modalClose = new EventEmitter<void>();
  closeModal() {
    this.modalClose.emit(); // Notifica al componente padre para cerrar el modal
  }
}
