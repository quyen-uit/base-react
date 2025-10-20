# Security Configuration

This document outlines the security measures implemented in the React Claude App.

## Security Headers

The application implements several security headers to protect against common web vulnerabilities:

### X-Frame-Options
- **Value**: `DENY`
- **Purpose**: Prevents clickjacking attacks by disallowing the app to be embedded in iframes

### X-Content-Type-Options
- **Value**: `nosniff`
- **Purpose**: Prevents MIME-sniffing attacks by forcing browsers to respect declared content types

### X-XSS-Protection
- **Value**: `1; mode=block`
- **Purpose**: Enables browser's built-in XSS filter (legacy browsers)

### Referrer-Policy
- **Value**: `strict-origin-when-cross-origin`
- **Purpose**: Controls how much referrer information is shared with other sites

### Permissions-Policy
- **Value**: `geolocation=(), microphone=(), camera=()`
- **Purpose**: Disables unnecessary browser features to reduce attack surface

## Content Security Policy (CSP)

The CSP is configured to minimize XSS risks while allowing necessary functionality:

### Development Mode
```
default-src 'self'
script-src 'self' 'unsafe-inline' 'unsafe-eval'
style-src 'self' 'unsafe-inline'
img-src 'self' data: https:
font-src 'self' data:
connect-src 'self' http://localhost:* ws://localhost:*
frame-ancestors 'none'
base-uri 'self'
form-action 'self'
```

**Note**: `unsafe-eval` and `unsafe-inline` are enabled in development for Hot Module Replacement (HMR) and React DevTools.

### Production Recommendations

For production, update `vite.config.ts` to use stricter CSP:

```typescript
'Content-Security-Policy': [
  "default-src 'self'",
  "script-src 'self'", // Remove unsafe-inline and unsafe-eval
  "style-src 'self' 'nonce-{random}'", // Use nonces
  "img-src 'self' data: https:",
  "font-src 'self'",
  "connect-src 'self' https://your-api-domain.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests"
].join('; ')
```

## Token Storage

### Current Implementation
- Refresh token: httpOnly, Secure cookie managed by the backend
- Access token: stored only in memory (Redux state) and added to requests via `Authorization: Bearer <token>`
- Cookies are sent on requests using `withCredentials`
- No tokens are persisted in `localStorage`

### Security Considerations

- httpOnly cookies mitigate XSS token theft (JS cannot read refresh token)
- Short‑lived access tokens limit impact of compromise
- CSRF protection recommended for state‑changing requests (see CSRF Protection)

## Refresh Token Mechanism

The application uses a refresh token system with these security features:

1. **Access Token**: Short-lived (~15 min), stored in memory (Redux)
2. **Refresh Token**: Long-lived (e.g., 7 days), stored in httpOnly cookie
3. **Automatic Refresh**: On 401, frontend calls `/auth/refresh` with credentials
4. **Secure Rotation**: Backend should rotate refresh tokens on each use
5. **Revocation**: Tokens revoked on logout or security events; backend clears cookie

## HTTPS Enforcement

### Development
- Development server runs on HTTP for convenience
- Configure reverse proxy for HTTPS if needed

### Production
**Critical**: Always use HTTPS in production

Update production headers:
```typescript
'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
```

## Environment Variables

### Security Best Practices

1. **Never commit `.env` files**
   - Use `.env.example` for documentation
   - `.env` is in `.gitignore`

2. **Validate environment variables**
   ```typescript
   // src/config/env.ts
   import { z } from 'zod';

   const envSchema = z.object({
     VITE_API_URL: z.string().url(),
     VITE_APP_NAME: z.string(),
   });

   export const env = envSchema.parse(import.meta.env);
   ```

3. **Different configs for different environments**
   - `.env.development`
   - `.env.staging`
   - `.env.production`

## Input Validation

All user inputs are validated using:

1. **Zod schemas** for type-safe validation
2. **React Hook Form** for form validation
3. **Server-side validation** (implement on backend)

Example:
```typescript
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
```

## API Security

### axios Interceptors

Request interceptor adds:
- Authorization header with JWT token
- CSRF token (if implemented)
- Request ID for tracing

Response interceptor handles:
- Token expiration (401)
- Refresh token rotation
- Error logging

### Rate Limiting

**Backend**: Implement rate limiting on API
**Frontend**: Consider implementing request queuing and debouncing

## XSS Prevention

1. **React's built-in protection**: JSX escapes values by default
2. **Avoid `dangerouslySetInnerHTML`**: Use only when absolutely necessary
3. **Sanitize HTML**: If you must render HTML, use DOMPurify:
   ```typescript
   import DOMPurify from 'dompurify';
   const clean = DOMPurify.sanitize(dirty);
   ```

## CSRF Protection

When using cookies, implement CSRF tokens for state‑changing requests:
```typescript
// Add CSRF token to requests (frontend)
axiosInstance.interceptors.request.use((config) => {
  if (config.method && config.method.toUpperCase() !== 'GET') {
    const csrf = getCsrfToken();
    if (csrf) config.headers['X-CSRF-Token'] = csrf;
  }
  return config;
});
```
Backend should provide a readable CSRF cookie (e.g., `XSRF-TOKEN`) and validate the header.

## Dependency Security

### Audit Dependencies Regularly

```bash
# Check for vulnerabilities
npm audit

# Fix automatically (use with caution)
npm audit fix

# Update dependencies
npm update
```

### Automated Security Scanning

Consider adding to CI/CD:
- **Snyk**: Vulnerability scanning
- **Dependabot**: Automated dependency updates
- **OWASP Dependency-Check**: Security scanning

## Security Checklist for Production

- [ ] Enable HTTPS with valid SSL certificate
- [ ] Set strict CSP (remove unsafe-inline, unsafe-eval)
- [ ] Implement refresh token mechanism
- [ ] Disable source maps (`sourcemap: false` in vite.config.ts)
- [ ] Add HSTS header
- [ ] Implement rate limiting on API
- [ ] Add request logging and monitoring
- [ ] Regular security audits (`npm audit`)
- [ ] Implement CSRF protection if using cookies
- [ ] Add WAF (Web Application Firewall) if possible
- [ ] Regular penetration testing
- [ ] Security training for development team

## Reporting Security Issues

If you discover a security vulnerability, please email: **security@yourcompany.com**

**Do not** open public GitHub issues for security vulnerabilities.

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy Guide](https://content-security-policy.com/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [React Security Best Practices](https://react.dev/learn/escape-hatches)
