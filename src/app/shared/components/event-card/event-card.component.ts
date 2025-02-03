import { Component, Input } from '@angular/core';
import { CardComponent } from "../ui/card/card.component";
import { ButtonComponent } from '../ui/button/button.component';
import { Event } from '../../../core/models/event.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-card',
  imports: [DatePipe, CardComponent, ButtonComponent],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() event!: Event;
}
