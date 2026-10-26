import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { AnalyticsService } from './analytics.service';

describe('AnalyticsService', () => {
  let service: AnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyticsService);
  });

  it('returns the full set of metrics', async () => {
    const metrics = await firstValueFrom(service.getMetrics());
    expect(metrics.length).toBe(6);
    expect(metrics[0].id).toBe('active-users');
  });

  it('resolves a metric by id', async () => {
    const metric = await firstValueFrom(service.getMetric('revenue'));
    expect(metric).toBeDefined();
    expect(metric!.unit).toBe('$');
  });

  it('returns undefined for an unknown id', async () => {
    const metric = await firstValueFrom(service.getMetric('nope'));
    expect(metric).toBeUndefined();
  });

  it('computes a summary of improving vs declining metrics', async () => {
    const summary = await firstValueFrom(service.getSummary());
    expect(summary.total).toBe(6);
    expect(summary.improving + summary.declining).toBeLessThanOrEqual(summary.total);
    expect(summary.improving).toBeGreaterThan(0);
    expect(summary.declining).toBeGreaterThan(0);
  });
});
