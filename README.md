# MyContacts API

A RESTful API for managing contacts and categories, built with Express.js and PostgreSQL.

This project is part of the **JStack Fullstack Developer Program** by [Mateus Silva](https://jstack.com.br).

## Tech Stack

- **Node.js** with **Express.js**
- **PostgreSQL** with `pg` client
- **Nodemon** for development
- **ESLint** for linting

## Prerequisites

- Node.js v18+
- Docker (for PostgreSQL)
- Yarn

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/mycontacts-api.git
cd mycontacts-api
```

### 2. Install dependencies

```bash
yarn
```

### 3. Start PostgreSQL

```bash
docker run --name pg -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres
```

### 4. Create the database and tables

Connect to the container and run the schema:

```bash
docker exec -it pg psql -U root
```

```sql
CREATE DATABASE mycontacts;
\c mycontacts
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE categories (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL UNIQUE
);

CREATE TABLE contacts (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE,
  phone VARCHAR,
  category_id UUID,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

### 5. Start the server

```bash
yarn dev
```

The API will be available at `http://localhost:3001`.

## API Endpoints

### Contacts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/contacts?orderBy=ASC` | List all contacts (sortable) |
| GET | `/contacts/:id` | Get a contact by ID |
| POST | `/contacts` | Create a new contact |
| PUT | `/contacts/:id` | Update a contact |
| DELETE | `/contacts/:id` | Delete a contact |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/categories` | List all categories |
| GET | `/categories/:id` | Get a category by ID |
| POST | `/categories` | Create a new category |
| PUT | `/categories/:id` | Update a category |
| DELETE | `/categories/:id` | Delete a category |

## Testing with cURL

**Create a category:**

```bash
curl -X POST http://localhost:3001/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Friends"}'
```

**Create a contact:**

```bash
curl -X POST http://localhost:3001/contacts \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "phone": "123456789", "category_id": "<category-uuid>"}'
```

**List all contacts:**

```bash
curl http://localhost:3001/contacts
```

## Project Structure

```
src/
├── index.js                 # Entry point
├── routes.js                # Route definitions
├── database/
│   ├── index.js             # Database connection
│   └── schema.sql           # SQL schema
└── app/
    ├── controllers/         # Request handlers
    ├── repositories/        # Data access layer
    └── middlewares/          # CORS & error handling
```
