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
import { UserProfilePage } from './features/profile/user-profile/user-profile.component';
import { EventsPage } from './features/events/events.component';
import { LoginPage } from './features/auth/login/login.component';
import { InputComponent } from './shared/components/ui/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [AppComponent, UserProfilePage, EventsPage, LoginPage],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    AppRoutingModule,
    LayoutComponent,
    EventCardComponent,
    ButtonComponent,
    InputComponent,
  ],
  exports: [],
  providers: [provideHttpClient(), EventsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
