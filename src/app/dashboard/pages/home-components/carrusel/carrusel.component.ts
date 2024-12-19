import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrusel.component.html',
  styles: ``,
})
export class CarruselComponent implements OnInit, OnDestroy {
  images = [
    'carrusel1.jpg',
    'carrusel2.jpg',
    'carrusel3.jpg',
    'carrusel4.jpg',
    'carrusel5.jpg',
    'carrusel6.jpg',
  ];
  currentIndex = 0;
  autoSlideInterval: any;
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private cdr: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.startAutoSlide();
    }
  }

  prev() {
    this.currentIndex =
      this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
    this.cdr.detectChanges(); // Forzar actualización
  }

  next() {
    this.currentIndex =
      this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
    this.cdr.detectChanges(); // Forzar actualización
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.next();
    }, 3000); // Cambia cada 3 segundos
  }

  ngOnDestroy() {
    if (this.isBrowser && this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }
}
