import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Metric, MetricSummary } from '../models/metric';

/**
 * Supplies analytics metrics. Uses an in-memory seed (with a simulated latency) so the app runs
 * standalone; swapping in a real HTTP backend only requires changing the source observable.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly seed: Metric[] = [
    { id: 'active-users', name: 'Active Users', value: 12840, unit: '', trend: 8.2 },
    { id: 'conversion', name: 'Conversion Rate', value: 3.4, unit: '%', trend: -1.1 },
    { id: 'revenue', name: 'Revenue', value: 48210, unit: '$', trend: 12.7 },
    { id: 'latency', name: 'Avg Latency', value: 182, unit: 'ms', trend: -4.5 },
    { id: 'errors', name: 'Error Rate', value: 0.6, unit: '%', trend: -0.3 },
    { id: 'sessions', name: 'Sessions', value: 29310, unit: '', trend: 5.9 },
  ];

  getMetrics(): Observable<Metric[]> {
    return of(this.seed).pipe(delay(0));
  }

  getMetric(id: string): Observable<Metric | undefined> {
    return this.getMetrics().pipe(map((metrics) => metrics.find((m) => m.id === id)));
  }

  /** Derives a summary (total, how many improving vs declining) from the metric stream. */
  getSummary(): Observable<MetricSummary> {
    return this.getMetrics().pipe(
      map((metrics) => ({
        total: metrics.length,
        improving: metrics.filter((m) => m.trend > 0).length,
        declining: metrics.filter((m) => m.trend < 0).length,
      })),
    );
  }
}
