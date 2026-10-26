import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AnalyticsService } from '../services/analytics.service';
import { Metric, MetricSummary } from '../models/metric';
import { MetricCardComponent } from '../metric-card/metric-card.component';

/** Overview page: a summary strip plus a responsive grid of metric cards. */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, MetricCardComponent],
  template: `
    @if (summary$ | async; as summary) {
      <div class="card summary">
        <span><strong>{{ summary.total }}</strong> metrics</span>
        <span class="up"><strong>{{ summary.improving }}</strong> improving</span>
        <span class="down"><strong>{{ summary.declining }}</strong> declining</span>
      </div>
    }

    <div class="grid">
      @for (metric of metrics$ | async; track metric.id) {
        <app-metric-card [metric]="metric" />
      } @empty {
        <p class="muted">Loading metrics…</p>
      }
    </div>
  `,
  styles: [
    `
      .summary { display: flex; gap: 1.5rem; margin-bottom: 1.25rem; }
      .summary .up { color: #4ade80; }
      .summary .down { color: #f87171; }
    `,
  ],
})
export class DashboardComponent {
  private readonly analytics = inject(AnalyticsService);
  readonly metrics$: Observable<Metric[]> = this.analytics.getMetrics();
  readonly summary$: Observable<MetricSummary> = this.analytics.getSummary();
}
