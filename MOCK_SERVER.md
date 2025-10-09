# Mock Backend Server

Since this application requires a backend API, here's a quick guide to set up a mock server for development.

## Option 1: Using json-server (Recommended for Quick Testing)

1. Install json-server globally:
```bash
npm install -g json-server
```

2. Create a `db.json` file in the project root:
```bash
# You can use the db.json file provided in this directory
```

3. Run the mock server:
```bash
json-server --watch db.json --port 5000 --routes routes.json
```

The API will be available at `http://localhost:5000/api`

## API Endpoints

The mock server provides the following endpoints:

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## Sample Users

```json
{
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}

{
  "email": "user@example.com",
  "password": "user123",
  "role": "user"
}
```

## Option 2: Using MSW (Mock Service Worker)

For a more sophisticated mock, install MSW:

```bash
npm install msw --save-dev
```

Then create mock handlers in `src/mocks/handlers.ts`.

## Option 3: Build Your Own Backend

You can build a real backend using:
- Node.js + Express
- NestJS
- FastAPI (Python)
- Spring Boot (Java)
- Any framework of your choice

Just make sure to implement the endpoints listed above and update the `VITE_API_URL` in your `.env` file.
