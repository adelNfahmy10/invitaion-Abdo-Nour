import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss'
})
export class DateComponent {
  private platformId = inject(PLATFORM_ID);
  hearts: any[] = [];
  targetDate = new Date('2026-09-10T00:00:00');
  time = {
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  ngOnInit() {
    this.generateHearts();
    if (isPlatformBrowser(this.platformId)) {
      this.startCountdown();
    }
  }

  generateHearts() {
    this.hearts = Array.from({ length: 40 }).map(() => ({
      left: Math.random() * 100,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 10,
      size: 6 + Math.random() * 14,
    }));
  }

  startCountdown() {
    setInterval(() => {
      const now = new Date().getTime();
      const target = this.targetDate.getTime();

      const diff = target - now;

      this.time.months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
      this.time.days = Math.floor(diff / (1000 * 60 * 60 * 24));
      this.time.hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      this.time.minutes = Math.floor((diff / (1000 * 60)) % 60);
      this.time.seconds = Math.floor((diff / 1000) % 60);
    }, 1000);
  }

  formatNumber(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
}
