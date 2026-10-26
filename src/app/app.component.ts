import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

/** Root shell: app title, tab navigation, and the routed view. */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="container">
      <h1>Analytics Dashboard</h1>
      <p class="muted">Angular · standalone components · RxJS · routing</p>
      <nav class="tabs">
        <a routerLink="/dashboard" routerLinkActive="active">Overview</a>
      </nav>
      <router-outlet />
    </div>
  `,
})
export class AppComponent {
  readonly title = 'angular-analytics-dashboard';
}
