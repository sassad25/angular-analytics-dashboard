import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Metric } from '../models/metric';

/** Presentational card for a single metric, linking to its detail route. */
@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a class="card metric-card" [routerLink]="['/metrics', metric.id]">
      <div class="metric-card__name muted">{{ metric.name }}</div>
      <div class="metric-card__value">{{ metric.unit === '$' ? '$' : '' }}{{ metric.value }}{{ metric.unit !== '$' ? metric.unit : '' }}</div>
      <div class="metric-card__trend" [class.up]="metric.trend > 0" [class.down]="metric.trend < 0">
        {{ metric.trend > 0 ? '▲' : metric.trend < 0 ? '▼' : '—' }} {{ trendAbs() }}%
      </div>
    </a>
  `,
  styles: [
    `
      .metric-card { display: block; transition: transform .15s; }
      .metric-card:hover { transform: translateY(-3px); }
      .metric-card__value { font-size: 1.9rem; font-weight: 800; margin: .25rem 0; }
      .metric-card__trend.up { color: #4ade80; }
      .metric-card__trend.down { color: #f87171; }
    `,
  ],
})
export class MetricCardComponent {
  @Input({ required: true }) metric!: Metric;

  trendAbs(): number {
    return Math.abs(this.metric.trend);
  }
}
