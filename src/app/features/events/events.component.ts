import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../core/services/events.service';
import { catchError, Observable, of } from 'rxjs';
import { Event } from '../../core/models/event.interface';

@Component({
  selector: 'app-events',
  standalone: false,
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})

export class EventsPage implements OnInit {
  events$: Observable<Event[]>;
  isLoading = false;
  hasError = false;

  constructor(public eventsService: EventsService) {
    this.events$ = this.eventsService.getAllEvents().pipe(
      catchError(() => {
        this.hasError = true;
        return of([]); 
      })
    );
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.events$.subscribe(() => (this.isLoading = false));
  }
}