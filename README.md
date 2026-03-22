# Short URL and QR Generator

Full-stack URL shortener built with Spring Boot, MySQL, JWT auth, React, and Vite.

## Deployment readiness

The repo is now wired for environment-based deployment:

- Backend secrets and database settings come from environment variables.
- Frontend API base URL comes from `VITE_API_BASE_URL` or falls back to same-origin in production.
- CORS origins are configurable through `APP_CORS_ALLOWED_ORIGINS`.
- Local development settings can be enabled with `SPRING_PROFILES_ACTIVE=dev`.

## Backend environment variables

Copy `.env.example` and provide real values for production:

- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `JWT_SECRET`
- `JWT_EXPIRATION`
- `APP_BASE_URL`
- `APP_CORS_ALLOWED_ORIGINS`
- `SERVER_PORT`

## Frontend environment variables

Copy `bitly-frontend/.env.example`:

- `VITE_API_BASE_URL`

## Local development

Backend:

```powershell
$env:SPRING_PROFILES_ACTIVE="dev"
mvn spring-boot:run
```

Frontend:

```powershell
cd bitly-frontend
npm install
npm run dev
```

## Production notes

- Set `APP_BASE_URL` to your deployed backend URL so generated short links are correct.
- Set `VITE_API_BASE_URL` if your frontend and backend are on different domains.
- Keep `SPRING_JPA_HIBERNATE_DDL_AUTO` conservative in production, such as `validate`.
- Rotate any secrets that were previously committed before this cleanup.
