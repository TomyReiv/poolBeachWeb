import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  private modalState = new BehaviorSubject<boolean>(false);
  modalState$ = this.modalState.asObservable();

  private cartSubject = new BehaviorSubject<any[]>([]); // Estado del carrito
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  openModal() {
    this.modalState.next(true);
  }

  closeModal() {
    this.modalState.next(false);
  }

  setCart(items: any[]) {
    this.cartItems.next(items); // Actualiza el carrito
  }

  getCart() {
    return this.cartItems.value;
  }

  reserve(bookingItems: any) {
    const email = bookingItems.email;
    const date = bookingItems.date;
    const sunbeds = bookingItems.sunbeds;
    const totalPrice = bookingItems.totalPrice;
    const name = bookingItems.name;
    
    return this.http.post(
      `${environment.apiUrlBack}api/booking`,
      { email, date, sunbeds, totalPrice, name },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }
}
