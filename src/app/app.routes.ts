import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
    children: [
      {
        path: 'Home',
        title: 'Home',
        loadComponent: () => import('./dashboard/pages/home/home.component'),
      },
      {
        path: 'Reserva',
        title: 'Reserva',
        loadComponent: () => import('./dashboard/pages/booking/booking.component'),
      },
      {
        path: 'Admin',
        title: 'Admin',
        loadComponent: () =>
          import('./dashboard/pages/admin/admin.component').then(
            (m) => m.AdminComponent
          ),
      },
      {
        path: '',
        redirectTo: 'dashboard/Home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'dashboard/Home',
    pathMatch: 'full',
  },
];
