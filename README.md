# Marina BeautyRoom App

Next.js 14 + TypeScript + Tailwind CSS — beauty salon booking system with admin dashboard.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Admin dashboard

URL: [http://localhost:3000/admin](http://localhost:3000/admin)

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `marina2026` |

## Features
- Public landing page with interactive time slot booking
- 7-day calendar with live slot availability
- Admin dashboard: manage bookings, block time slots
- Cookie-based auth protecting `/admin/*`
- Mock data (no database required for demo)

## Deploy
Connect to Vercel, set env var `ADMIN_PASSWORD=marina2026`
