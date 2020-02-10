import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'mdv12-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  time = 0;

  constructor() { }

  ngOnInit() {
    this.startInterval();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getSeconds() {
    return this.time - this.getMinutes() * 60;
  }
  getMinutes() {
    return Math.floor(this.time / 60);
  }
  getHours() {
    return Math.floor(this.time / 3600);
  }

  startInterval() {
    interval(1000).pipe(
      takeUntil(this.destroy$)
    ).subscribe((x) => {
      this.time += 1;
      return x;
    });
  }

  stopInterval() {
    this.destroy$.next(true);
  }

  reset() {
    this.time = 0;
    this.stopInterval();
  }
}
