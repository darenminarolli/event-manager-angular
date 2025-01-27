import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../core/services/events.service';

@Component({
  selector: 'app-events',
  standalone: false,
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsPage implements OnInit {
  constructor(public eventsService: EventsService) {}

  ngOnInit(): void {
    this.eventsService.loadEvents();
  }
}
