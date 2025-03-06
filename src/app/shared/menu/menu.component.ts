import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  inject,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SectionService } from '../../services/section.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  isMenuOpen = false; // Estado del menú móvil
  isSticky = false; // Estado para saber si el navbar es fixed
  activeSection = 'Home';
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private router: Router,
    private sectionService: SectionService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isMenuOpen = false; // Cerrar el menú al navegar
      });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.observeSections();
      }, 0); // Asegura que se ejecuta después de la renderización
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  redirect() {
    window.location.href = '/Home';
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

    this.isSticky = scrollPos > 30;
  }

  scrollTo(id: string, sectionName: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
    this.activeSection = sectionName;
  }

  observeSections(): void {
    const sections = document.querySelectorAll('section');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
  }
}
