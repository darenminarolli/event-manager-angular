import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsPage } from './features/events/events.component';
import { UserProfilePage } from './features/profile/user-profile/user-profile.component';
import { AdminProfilePage } from './features/profile/admin-profile/admin-profile.component';
import { LoginPage } from './features/auth/login/login.component';
import { RegisterPage } from './features/auth/register/register.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomePage),
  },
  { path: 'events', component: EventsPage },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginPage,
      },
      {
        path: 'register',
        component: RegisterPage,
      },
    ],
  },
  {
    path: 'profile',
    children: [
      {
        path: 'user',
 
        component: UserProfilePage
      },
      {
        path: 'admin',
        component: AdminProfilePage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
