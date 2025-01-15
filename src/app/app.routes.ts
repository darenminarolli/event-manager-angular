import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AppComponent } from './app.component';
export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
          { path: '', loadChildren: () => import('./features/home/home.component').then(m => m.HomeComponent) },
        //   { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
        ],
      },
];
