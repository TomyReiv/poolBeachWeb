import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { SectionService } from './services/section.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'appTailwind';

  sections: HTMLElement[] = [];  // Definir el array de secciones como un array de HTMLElement

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private sectionService: SectionService) {}

  ngAfterViewInit(): void {
    // Asegúrate de que solo se ejecute en el navegador
    if (isPlatformBrowser(this.platformId)) {
      // Convertimos el NodeList en un array utilizando Array.from()
      this.sections = Array.from(document.querySelectorAll('section'));

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            const sectionName = sectionId!.charAt(0).toUpperCase() + sectionId!.slice(1);
            this.sectionService.setActiveSection(sectionName);  // Actualizar la sección activa
          }
        });
      }, { threshold: 0.5 });  // Detectar cuando al menos el 50% de la sección es visible

      // Observar todas las secciones
      this.sections.forEach(section => {
        observer.observe(section);
      });
    }
  }
}
