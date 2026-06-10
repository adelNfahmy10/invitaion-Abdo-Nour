import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  activeLink: string = 'home';
  sections = [
    { id: 'home', name: 'navbar.home' },
    { id: 'about', name: 'navbar.about' },
    { id: 'why-us', name: 'navbar.whyUs' },
    { id: 'feature', name: 'navbar.features' },
    { id: 'how-it-work', name: 'navbar.how-it-work' },
    { id: 'event-types', name: 'navbar.event-types' },
    { id: 'pricing', name: 'navbar.pricing' },
    { id: 'faq', name: 'navbar.faq' },
    { id: 'contact-us', name: 'navbar.contact-us' },
  ];

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
