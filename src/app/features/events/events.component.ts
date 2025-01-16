import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { EventCardComponent } from "../../shared/components/event-card/event-card.component";
import { EventsService } from '../../core/services/events.service';
import { EventStateService } from '../../core/services/event-state.service';
import { Event } from '../../core/models/event.interface';

import { take } from 'rxjs';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    ButtonComponent, 
    EventCardComponent
  ],
  providers: [EventsService],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsPage implements OnInit {
  perform = new EventStateService<Event[]>();

  constructor(private eventService: EventsService){}

  ngOnInit(): void {
    this.perform.load(this.eventService.getAllEvents());
  }  
}