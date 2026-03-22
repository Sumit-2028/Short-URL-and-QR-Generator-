# Short URL and QR Generator Backend

Spring Boot backend for a URL shortener with JWT authentication, MySQL persistence, and QR code generation.

## Environment variables

Copy `.env.example` and provide real values for deployment:

- `SPRING_PROFILES_ACTIVE`
- `SERVER_PORT`
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `JWT_SECRET`
- `JWT_EXPIRATION`
- `APP_BASE_URL`
- `APP_CORS_ALLOWED_ORIGINS`

## Local development

Run with the development profile:

```powershell
$env:SPRING_PROFILES_ACTIVE="dev"
mvn spring-boot:run
```

## Production notes

- Set `APP_BASE_URL` to your deployed backend URL so generated short links are correct.
- Set `APP_CORS_ALLOWED_ORIGINS` to your deployed frontend domain.
- Keep `SPRING_JPA_HIBERNATE_DDL_AUTO` conservative in production, such as `validate`.
- Keep database credentials and JWT secrets only in your hosting provider's environment variables.
