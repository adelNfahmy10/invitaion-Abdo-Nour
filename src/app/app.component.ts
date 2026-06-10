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
    this.generateHearts()
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

  isOpen = false;
  audio!: HTMLAudioElement;

  openCurtain() {
    this.audio = new Audio('assets/audio/song.mp3');
    // إعادة الصوت للبداية
    this.audio.currentTime = 0;
    this.audio.volume = 1;

    // تشغيل الصوت
    this.audio.play().catch(err => {
      console.log('Audio blocked:', err);
    });

    // فتح الستارة
    this.isOpen = true;
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


}
