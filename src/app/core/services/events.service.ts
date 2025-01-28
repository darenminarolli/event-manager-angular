import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, take, of } from 'rxjs';
import { Event } from '../models/event.interface';

@Injectable()
export class EventsService {
  private url = 'https://event-manager-api-ten.vercel.app/api/events';

  data: Event[] | undefined;
  isLoading = false;
  hasError = false;

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.url);
  }

}
