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
  @Input() eventData: { title: string; description: string; image: string, date: string, menu:String, price:Number, phone:String } = {
    title: '',
    description: '',
    image: '',
    date: '',
    menu: '',
    price: 0,
    phone: ''
  };
  @Input() showModal: boolean = false;
  @Output() modalClose = new EventEmitter<void>();
  closeModal() {
    this.modalClose.emit(); // Notifica al componente padre para cerrar el modal
  }
}
