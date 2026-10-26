import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'metrics/:id',
    loadComponent: () =>
      import('./metric-detail/metric-detail.component').then((m) => m.MetricDetailComponent),
  },
  { path: '**', redirectTo: 'dashboard' },
];
