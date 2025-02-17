import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { SundbedsService } from '../../../services/sundbeds.service';
import { CommonModule } from '@angular/common';
import { Sunbed } from '../../../interfaces/sunbeds';
import { FooterComponent } from '../../../shared/footer/footer.component';
/* import { AuthService } from '../../../services/auth.service'; */
import { CartService } from '../../../services/cart.service';
import { ModalCartComponent } from '../modal-cart/modal-cart.component';
/* import { ModalAuthComponent } from '../modal-auth/modal-auth.component'; */

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    ModalCartComponent /* ModalAuthComponent */,
  ],
  templateUrl: './booking.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BookingComponent {
  private sundbedsService = inject(SundbedsService);
/*   private authService = inject(AuthService); */
  private cdr = inject(ChangeDetectorRef);
  private cartService = inject(CartService);

  isSticky = false;
  showModal: boolean = false;
  public authState: any = false;
  public items: Sunbed[] = [];
  public date: string =
    /* new Date().toISOString().split('T')[0] || */ '2025-06-01';
  public numbers: number[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  selectedItems: {
    [key: string]: { name: string; amount: number; price: number };
  } = {};
  cartItems: any[] = [];

  openCartModal() {
    this.cartService.openModal();
  }

  updateSelectedItem(item: any, event: Event) {
    const selectedAmount = (event.target as HTMLSelectElement).value;

    // Si la cantidad es mayor a 0, la guardamos, si no, la eliminamos del objeto
    if (parseInt(selectedAmount, 10) > 0) {
      this.selectedItems[item.name] = {
        name: item.name,
        amount: parseInt(selectedAmount, 10),
        price: item.price,
      };
    } else {
      delete this.selectedItems[item.name]; // Si la cantidad es 0, eliminamos el producto
    }
  }

  addToCart() {
    this.cartItems = Object.values(this.selectedItems); // Convertimos el objeto en array
    this.cartItems.push({ date: this.date }); // Añadimos la fecha al carrito
    this.cartService.setCart(this.cartItems);
  }

  getSundbeds() {
    this.sundbedsService.getSundbeds(this.date).subscribe(
      (data: any) => {
        if (data?.data?.length > 0 && data.data[0].entries) {
          this.items = data.data[0].entries;
        } else {
          console.warn('No se encontraron entradas para la fecha seleccionada');
          this.items = []; // Evitar errores en el template
        }
      },
      (error) => {
        console.error('Error en la API:', error);
        this.items = []; // Manejo de error
      }
    );
  }

  redirect() {
    window.location.href = '/dashboard/Home';
  }

  ngOnInit() {
    this.getSundbeds();
    /* this.authState = this.authService.checkAuth(); */
    if (!this.authState) {
      this.showModal = true;
    }
  }

  onDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.date = target.value;
    this.sundbedsService.getSundbeds(this.date).subscribe((data: any) => {
      this.items = data.data[0].entries;
      this.cdr.detectChanges();
    });
  }

  closeModal() {
    this.showModal = false;
  }
  openModal() {
    this.showModal = true;
    console.log('Modal abierto: ', this.showModal);

    this.cdr.markForCheck();
  }
}
