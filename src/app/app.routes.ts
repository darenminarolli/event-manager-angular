import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomePage),
  },
  {
    path: 'events',
    loadComponent: () =>
      import('./features/events/events.component').then((m) => m.EventsPage),
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(
            (m) => m.LoginPage
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component').then(
            (m) => m.RegisterPage
          ),
      },
    ],
  },
  {
    path: 'profile',
    children: [
      {
        path: 'user',
        loadComponent: () =>
          import('./features/profile/user-profile/user-profile.component').then(
            (m) => m.UserProfilePage
          ),
      },
    ],
  },
];
