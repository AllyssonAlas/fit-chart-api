# Fit Chart App

## Introduction

*Fit Chart* is a study case split into three parts: a React Native app, this Node.js backend, and a React.js web app. Together they form a system to help gyms, instructors, and members with their daily workout routine. The focus is on *architecture*: the same layered design is reused across mobile, backend, and web, with clear boundaries and dependency rules.

Benefits of this architecture:

- *Modularity*: Layers are loosely coupled, so code in each layer can be reused across projects (e.g. domain logic shared between app and web).
- *Testability*: Separation of concerns makes unit and integration tests straightforward, with support for high coverage.
- *Maintainability*: A clear structure and consistent patterns make the codebase easier to navigate and change.

## About This Project

This repository is the *Fit Chart API*: the backend that powers both the mobile app and the web app. It exposes a REST API for authentication, user management, and gym-related business logic, and it acts as the single source of truth for the system.

Built with Node.js and Express, the API supports multiple user roles (e.g. members, instructors, administrators), applies domain rules in a structured way, and persists data with PostgreSQL via Prisma. It is designed as the core of the Fit Chart ecosystem, so that the same data and rules are shared across all clients.

## Built With

- [Node.js](https://nodejs.org/) – Runtime
- [Express](https://expressjs.com/) – Web framework
- [TypeScript](https://www.typescriptlang.org/) – Typed JavaScript
- [Prisma](https://www.prisma.io/) – Database ORM and migrations
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) – Password hashing
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) – JWT authentication
- [Biome](https://biomejs.dev/) – Linting and formatting
- [Jest](https://jestjs.io/) + [Supertest](https://github.com/ladjs/supertest) – Unit and API tests
- [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/okonet/lint-staged) – Git hooks and staged linting

## Getting Started

You need Node.js and a *PostgreSQL* database to run the Fit Chart API.

### Prerequisites

1. [Node.js](https://nodejs.org/) (v20 or later recommended)
2. [PostgreSQL](https://www.postgresql.org/) – running locally or via a hosted service

### Installation

1. *Clone the repo*
   sh
   git clone https://github.com/AllyssonAlas/fit-chart.git
   cd fit-chart
   

2. *Install dependencies*
   sh
   npm install
   

3. *Environment*
   Create a .env file in the project root with your database URL and any other required variables, for example:
   
   DATABASE_URL="postgresql://user:password@localhost:5432/fit_chart"
   
   (If there is an .env.example in the repo, you can copy from that.)

4. *Database*
   Apply Prisma migrations to create or update the database schema:
   sh
   npx prisma migrate dev
   
   Or, to sync the schema without migration history: npx prisma db push

5. *Build and run*
   sh
   npm run build
   npm start
   
   The API will start (default is typically http://localhost:8080 or as configured in your env).

### Running tests

Tests use a separate config (e.g. .env.test). With a test database available, you can run:
- npm test – run the test suite
- npm run test:coverage – run tests with coverage
- npm run test:prepare – start the test database with Docker and sync schema (if using docker-compose-test-db.yml)