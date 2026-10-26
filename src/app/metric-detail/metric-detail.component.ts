import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AnalyticsService } from '../services/analytics.service';
import { Metric } from '../models/metric';

/** Detail view for one metric, resolved from the {@code :id} route parameter via switchMap. */
@Component({
  selector: 'app-metric-detail',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  template: `
    <a routerLink="/dashboard">&larr; Back to overview</a>
    @if (metric$ | async; as metric) {
      <div class="card" style="margin-top:1rem">
        <h2>{{ metric.name }}</h2>
        <p class="metric-value">{{ metric.unit === '$' ? '$' : '' }}{{ metric.value }}{{ metric.unit !== '$' ? metric.unit : '' }}</p>
        <p [class.up]="metric.trend > 0" [class.down]="metric.trend < 0">
          Trend: {{ metric.trend }}% vs previous period
        </p>
      </div>
    } @else {
      <p class="muted" style="margin-top:1rem">Metric not found.</p>
    }
  `,
  styles: [
    `
      .metric-value { font-size: 2.5rem; font-weight: 800; }
      .up { color: #4ade80; }
      .down { color: #f87171; }
    `,
  ],
})
export class MetricDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly analytics = inject(AnalyticsService);

  readonly metric$: Observable<Metric | undefined> = this.route.paramMap.pipe(
    map((params) => params.get('id') ?? ''),
    switchMap((id) => this.analytics.getMetric(id)),
  );
}
