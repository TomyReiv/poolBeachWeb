import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-cart.component.html',
  styles: ``,
})
export class ModalCartComponent {
  showModal = false;
  cartItems: any[] = [];
  email: string = '';
  bookingItems: any;
  date: string = '';
  items: any[] = [];
  name: string = '';

  constructor(private cartService: CartService) {
    this.cartService.modalState$.subscribe((state) => {
      this.showModal = state;
    });

    this.cartService.cartItems$.subscribe((items) => {
      this.items = items;
      const restOfArray = items.slice(0, items.length - 1);
      this.cartItems = restOfArray;
    });
  }

  closeModal() {
    this.cartService.closeModal();
  }

  updateEmail(event: Event) {
    this.email = (event.target as HTMLInputElement).value;
  }

  updateName(event: Event) {
    this.name = (event.target as HTMLInputElement).value;
  }

  reserve() {
    if (!this.email) {
      alert('Por favor, ingresa un correo electrónico.');
      return;
    }
    if (!this.name) {
      alert('Por favor, ingrese su nombre.');
      return;
    }
    const dateItem = this.items.find((item) => item.date);
    const date = dateItem ? dateItem.date : null;
    const email = this.email;
    const name = this.name;
    const sunbeds = this.items
      .filter((item) => item.name) // Filtrar solo los que tienen 'name'
      .map((item) => ({
        name: item.name,
        amount: item.amount,
      }));

    if (!date || sunbeds.length === 0) {
      alert('Faltan datos para la reserva.');
      return;
    }
    const totalPrice = this.cartItems.reduce(
      (acc: number, item: any) => acc + item.amount * item.price,
      0
    );
    console.log('Total:', totalPrice);
    
    this.bookingItems = {
      date,
      email,
      name,
      totalPrice,
      sunbeds,
    };
    console.log('Booking:', this.bookingItems);
    
    this.cartService.reserve(this.bookingItems).subscribe(
      (response: any) => {
        window.location.href = response.data.sessionUrl;
        this.closeModal();
      },
      (error) => {
        alert('Error en la reserva');
      }
    );
  }
}
