# Angular Analytics Dashboard

A single-page **Angular 18** analytics dashboard built with **standalone components**, a service
layer using **RxJS**, **client-side routing** with lazy-loaded routes, and **Jasmine/Karma** unit
tests. Demonstrates idiomatic modern Angular front-end architecture.

> Author: **Muhammad Shehzeb Assad** — Senior Full Stack Java Developer
> Portfolio: https://github.com/sassad25

---

## What it demonstrates

- **Standalone components** (no NgModules) — the modern Angular style.
- **RxJS data flow** — `AnalyticsService` exposes `Observable` streams; components consume them with
  the `async` pipe (no manual subscriptions to leak). Operators used: `map`, `switchMap`, `delay`.
- **Routing** — `provideRouter` with **lazy `loadComponent`** routes and a route parameter
  (`/metrics/:id`) resolved reactively via `switchMap` on `paramMap`.
- **Component design** — a smart `DashboardComponent` (data + summary) composed of a presentational
  `MetricCardComponent` with a typed, required `@Input`.
- **Strict TypeScript + strict Angular templates** (`strictTemplates`, `noPropertyAccessFromIndexSignature`, etc.).
- **Unit tests** — `TestBed` component tests and service tests, run headless under Karma/Jasmine.

## Structure

```
src/app/
├── app.component.ts            # root shell: nav + <router-outlet>
├── app.config.ts               # provideRouter + provideHttpClient
├── app.routes.ts               # lazy routes (dashboard, metric detail)
├── models/metric.ts            # Metric + MetricSummary types
├── services/
│   ├── analytics.service.ts    # RxJS streams: metrics, single metric, derived summary
│   └── analytics.service.spec.ts
├── dashboard/
│   ├── dashboard.component.ts   # smart component (async pipe, @for/@if control flow)
│   └── dashboard.component.spec.ts
├── metric-card/
│   ├── metric-card.component.ts # presentational, required @Input
│   └── metric-card.component.spec.ts
└── metric-detail/
    └── metric-detail.component.ts  # route-param driven detail view
```

## Tech stack

Angular 18 · TypeScript 5.5 (strict) · RxJS 7 · Angular Router · Jasmine · Karma (ChromeHeadless) ·
Angular CLI (esbuild application builder).

## Run

```bash
npm install
npm start          # dev server at http://localhost:4200
```

## Build

```bash
npm run build      # AOT production build to dist/
```

## Test

```bash
npm test           # headless Chrome, single run (10 specs)
npm run test:watch # interactive watch mode
```

> Verified locally: `npm run build` produces an optimized AOT bundle with lazy route chunks, and
> `npm test` runs **10 passing specs** in ChromeHeadless.

## License

MIT © Muhammad Shehzeb Assad
