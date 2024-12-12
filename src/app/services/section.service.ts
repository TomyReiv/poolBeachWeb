import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private activeSectionSource = new BehaviorSubject<string>('Home');
  activeSection$ = this.activeSectionSource.asObservable();

  setActiveSection(section: string) {
    this.activeSectionSource.next(section);
  }
  
}
