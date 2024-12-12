
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-parallax',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parallax.component.html',
})
export class ParallaxComponent {
  objectPosition: string = '100% 0%'; // Inicia en la parte superior

  // Escucha el scroll global
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop; // Posición del scroll
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight; // Máximo scroll posible

    const scrollPercentage = (scrollY / maxScroll) * 100; // Calcula porcentaje de scroll
    const yPosition = Math.min(100, scrollPercentage); // Limita el rango a 100%
    this.objectPosition = `50% ${yPosition}%`; // Ajusta la posición de la imagen
  }
}
