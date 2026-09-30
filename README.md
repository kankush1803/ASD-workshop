# Express Caching Workshop Application

A modular Express.js application demonstrating in-memory caching middleware with TTL (Time To Live), cache headers, automatic cache invalidation on data modifications, and layered architecture.

## Architecture & Request Flow

The application follows the layered architecture:
```
Request ──▶ Route ──▶ Middleware ──▶ Controller ──▶ Service ──▶ Database
```

### Folder Structure

```
.
├── database/
│   └── productDatabase.js      # Data access & mock database storage
├── services/
│   └── productService.js       # Business logic and database coordination
├── middleware/
│   └── cacheMiddleware.js      # In-memory cache store, caching middleware & invalidation
├── controllers/
│   └── productController.js    # Request handling & cache invalidation triggers
├── routes/
│   └── productRoutes.js        # Route definitions & middleware wiring
├── test/
│   └── products.test.js        # Automated integration tests
├── app.js                      # Express application setup
├── server.js                   # Server bootstrap & entry point
└── package.json
```

---

## Features

### 1. In-Memory Caching Middleware
- Cached endpoints:
  - `GET /products`
  - `GET /products/:id`
- Cache entries store the response payload along with a `createdAt` timestamp.

### 2. Time To Live (TTL) of 1 Minute
- Every cache entry has a TTL of **60 seconds (1 minute)**.
- When an endpoint is requested:
  - Checks if the entry exists and whether `Date.now() - entry.createdAt <= 60000`.
  - If expired (> 1 minute), the cached entry is discarded, fresh data is fetched from the database, and stored again in the cache with the updated `createdAt`.

### 3. Cache HIT / MISS Headers
- **Cache HIT**: Sets response header `X-Cache: HIT`, `X-Cache-Created-At`, and `X-Cache-Age-Seconds`.
- **Cache MISS**: Sets response header `X-Cache: MISS`.

### 4. Cache Invalidation
- When any `POST`, `PUT`, `PATCH`, or `DELETE` request successfully modifies the data:
  - Stale cache entries are automatically invalidated.
  - Subsequent `GET` requests fetch fresh data from the database with an `X-Cache: MISS` header.

---

## API Endpoints

| Method | Endpoint | Description | Cache Behavior |
|---|---|---|---|
| `GET` | `/products` | List all products | Cached (1 min TTL, `X-Cache: HIT/MISS`) |
| `GET` | `/products/:id` | Get product by ID | Cached (1 min TTL, `X-Cache: HIT/MISS`) |
| `POST` | `/products` | Create a new product | Invalidates product cache |
| `PUT` | `/products/:id` | Full update of a product | Invalidates product cache |
| `PATCH` | `/products/:id` | Partial update of a product | Invalidates product cache |
| `DELETE` | `/products/:id` | Delete a product | Invalidates product cache |

---

## Running the Application

### Start the Server
```bash
npm start
```
Server runs on `http://localhost:3000`.

### Run Tests
```bash
npm test
```
