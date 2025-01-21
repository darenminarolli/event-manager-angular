import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { EventCardComponent } from '../../shared/components/event-card/event-card.component';
import { EventsService } from '../../core/services/events.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, ButtonComponent, EventCardComponent],
  providers: [EventsService],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsPage implements OnInit {
  constructor(public eventsService: EventsService) {}

  ngOnInit(): void {
    this.eventsService.loadEvents();
  }
}
