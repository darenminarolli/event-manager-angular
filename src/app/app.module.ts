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
import { LoginPage } from './features/auth/login/login.component';
import { InputComponent } from './shared/components/ui/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { RegisterPage } from './features/auth/register/register.component';

@NgModule({
  declarations: [AppComponent, EventsPage, LoginPage, RegisterPage],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
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
