import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, HostListener, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { NgwWowService } from 'ngx-wow';
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { FooterComponent } from "./footer/footer.component";
import { LocationComponent } from "./location/location.component";
import { DateComponent } from "./date/date.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, HomeComponent, AboutComponent, FooterComponent, LocationComponent, DateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit{
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)
  private readonly _NgwWowService = inject(NgwWowService)

  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this._NgwWowService.init();
    }

    setTimeout(() => {
      this.palySound()
    }, 500);
  }

  showArrow:boolean = false
  @HostListener('window:scroll') onScroll(){
    let scrollPosition = window.scrollY;
    if (scrollPosition > 200) {
      this.showArrow = true
    } else {
      this.showArrow = false
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  hearts: any[] = [];
  generateHearts() {
    this.hearts = Array.from({ length: 40 }).map(() => ({
      left: Math.random() * 100,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 10,
      size: 6 + Math.random() * 14,
    }));
  }

  audio!: HTMLAudioElement;

  palySound() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.audio = new Audio('assets/audio/song.mp3');
      this.audio.loop = true;

      const start = () => {
        this.audio.play().catch(console.error);

        document.removeEventListener('click', start);
        document.removeEventListener('touchstart', start);
        document.removeEventListener('scroll', start);
      };

      document.addEventListener('click', start, { once: true });
      document.addEventListener('touchstart', start, { once: true });
      document.addEventListener('scroll', start, { once: true, passive: true });
    }
  }
}
