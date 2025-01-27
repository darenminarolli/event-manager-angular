import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { AppRoutingModule } from './app-routing.module';
import { ButtonComponent } from './shared/components/ui/button/button.component';
import { provideHttpClient } from '@angular/common/http';
import { EventCardComponent } from './shared/components/event-card/event-card.component';
import { EventsService } from './core/services/events.service';
import { EventsPage } from './features/events/events.component';

@NgModule({
  declarations: [AppComponent, EventsPage],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    LayoutComponent,
    ButtonComponent,
    EventCardComponent,
  ],
  exports: [LayoutComponent, ButtonComponent, EventCardComponent],
  providers: [provideHttpClient(), EventsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
