import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  NO_ERRORS_SCHEMA,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { SundbedsService } from '../../../services/sundbeds.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Sunbed } from '../../../interfaces/sunbeds';
import { FooterComponent } from '../../../shared/footer/footer.component';
/* import { AuthService } from '../../../services/auth.service'; */
import { CartService } from '../../../services/cart.service';
import { ModalCartComponent } from '../modal-cart/modal-cart.component';
import { environment } from '../../../../../environments/environment';
/* import { ModalAuthComponent } from '../modal-auth/modal-auth.component'; */
import { NgHcaptchaModule } from 'ng-hcaptcha';

declare const hcaptcha: any;

declare global {
  interface Window {
    hcaptcha: any;
    onCaptchaSuccess: (token: string) => void;
    onCaptchaExpired: () => void;
    onCaptchaError: () => void;
  }
}

@Component({
  selector: 'app-booking',
  standalone: true,
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    NgHcaptchaModule,
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

  captchaVerified = false;
  captchaToken: string | null = null;

  isSticky = false;
  showModal: boolean = false;
  public authState: any = false;
  public items: Sunbed[] = [];
  public captcha_key: string = environment.hcaptchaSiteKey;
  public date: string = new Date().toISOString().split('T')[0];
  public numbers: number[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  isToday: boolean = false;
  today: string = new Date().toISOString().split('T')[0];

  selectedItems: {
    [key: string]: { name: string; amount: number; price: number };
  } = {};
  cartItems: any[] = [];

  @ViewChild('captchaContainer', { static: false })
  captchaContainer!: ElementRef;

  platformId: object;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.platformId = platformId;
  }

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
    if (this.captchaVerified && this.captchaToken) {
      this.cartItems = Object.values(this.selectedItems); // Convertimos el objeto en array
      this.cartItems.push({ date: this.date }); // Añadimos la fecha al carrito
      this.cartService.setCart(this.cartItems);
    } else {
      console.error('Captcha no validado');
    }
  }

  getSundbeds() {
    this.sundbedsService.getSundbeds(this.date).subscribe(
      (data: any) => {
        if (data?.data?.length > 0 && data.data[0].entries) {
          this.items = data.data[0].entries;
          this.cdr.detectChanges();
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
    window.location.href = '/Home';
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.onCaptchaSuccess = (token: string) => this.onCaptchaSuccess(token);
      window.onCaptchaExpired = () => this.onCaptchaExpired();
      window.onCaptchaError = () => this.onCaptchaError();
    }
    setTimeout(() => {
      this.getSundbeds();
      if (this.today === this.date) this.isToday = true;
      /* this.authState = this.authService.checkAuth(); */
      if (!this.authState) {
        this.showModal = true;
      }
    }, 0);
  }

  onDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.date = target.value;
    this.isToday = this.today === this.date;

    this.cdr.detectChanges(); // Forzar actualización de la vista

    this.sundbedsService.getSundbeds(this.date).subscribe((data: any) => {
      if (data?.data?.length > 0 && data.data[0].entries) {
        this.items = data.data[0].entries;
        this.cdr.detectChanges();
      } else {
        console.log('No se encontraron entradas para la fecha seleccionada');
        this.items = []; // Evitar errores en el template
      }
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

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadHCaptcha();
    }
  }

  loadHCaptcha() {
    if (window.hcaptcha) {
      window.hcaptcha.render(this.captchaContainer.nativeElement.querySelector('.h-captcha'), {
        sitekey: '4a2663d6-72f4-43e2-9df4-d88e381e9a28',
        callback: 'onCaptchaSuccess', // 🔹 Ahora usa el nombre global
        'expired-callback': 'onCaptchaExpired',
        'error-callback': 'onCaptchaError'
      });
    } else {
      console.error('hCaptcha no está cargado');
    }
  }

  onCaptchaSuccess(token: any) {
    this.captchaVerified = true;
    this.captchaToken = token;
    console.log('Captcha verificado:', this.captchaVerified);

    this.cdr.detectChanges();
  }

  onCaptchaExpired() {
    this.captchaVerified = false;
    this.captchaToken = null;
    this.cdr.detectChanges();
  }

  onCaptchaError() {
    this.captchaVerified = false;
    this.captchaToken = null;
    this.cdr.detectChanges();
  }
}
