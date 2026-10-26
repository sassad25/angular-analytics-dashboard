import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MetricCardComponent } from './metric-card.component';
import { Metric } from '../models/metric';

describe('MetricCardComponent', () => {
  let fixture: ComponentFixture<MetricCardComponent>;
  let component: MetricCardComponent;

  const metric: Metric = { id: 'revenue', name: 'Revenue', value: 48210, unit: '$', trend: 12.7 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MetricCardComponent);
    component = fixture.componentInstance;
    component.metric = metric;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('renders the metric name and value', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Revenue');
    expect(el.textContent).toContain('48210');
  });

  it('exposes the absolute trend value', () => {
    expect(component.trendAbs()).toBe(12.7);
    component.metric = { ...metric, trend: -4.5 };
    expect(component.trendAbs()).toBe(4.5);
  });
});
