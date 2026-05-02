# Next.js Backend

To run the backend in development:

```bash
cd backend
npm install
npm run dev
```

Dev server runs on port `5000` as configured in package.json.

Available API routes:
- GET `/api/status`
- POST `/api/auth/signin`
- POST `/api/auth/signup`
- GET `/api/issuer`
- GET `/api/verification`

Adjust `FRONTEND_URL` in `.env.local` for CORS origins in development.
