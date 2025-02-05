import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventsService } from '../../core/services/events.service';
import { catchError, Subject, takeUntil } from 'rxjs';
import { Event } from '../../core/models/event.interface';

@Component({
  selector: 'app-events',
  standalone: false,
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsPage implements OnInit, OnDestroy {
  events: Event[] = [];
  isLoading = false;
  hasError = false;
  private unsubscribe$ = new Subject<void>();

  constructor(public eventsService: EventsService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents() {
    this.isLoading = true;
    this.eventsService
      .getAllEvents()
      .pipe(
        catchError(() => {
          this.hasError = true;
          return [];
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((events) => {
        this.events = events;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
