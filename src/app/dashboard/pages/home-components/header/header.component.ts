import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  
  activeSection = 'Home';

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
  redirect(){
    window.location.href = '/Reserva';
  }
}
