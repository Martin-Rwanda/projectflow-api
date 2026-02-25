# ProjectFlow API

> Multi-tenant project management REST API built with NestJS, TypeORM, PostgreSQL, Redis, and Meilisearch.

## Tech Stack

- **Framework**: NestJS (Clean Architecture + CQRS)
- **Database**: PostgreSQL + TypeORM
- **Cache / Queues**: Redis + BullMQ
- **Search**: Meilisearch
- **Auth**: JWT + Refresh Tokens + Google OAuth + TOTP MFA
- **Storage**: Cloudinary
- **Email**: BullMQ + Resend
- **Billing**: Stripe
- **Observability**: Pino + OpenTelemetry + Prometheus

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production only — every commit is a release |
| `develop` | Integration branch — all features merge here |
| `feature/*` | One branch per feature |
| `release/*` | Release preparation |
| `hotfix/*` | Emergency production fixes |

## Getting Started
```bash
cp .env.example .env
docker-compose up -d
pnpm install
pnpm run migration:run
pnpm run start:dev
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch, commit, and PR conventions.
