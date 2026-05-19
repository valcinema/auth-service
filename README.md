# ValCinema: Auth Service

Microservice responsible for authentication within the ValCinema ecosystem. It handles OTP (One-Time Password) generation, verification via email or phone, user account creation, and the issuance of custom HMAC-signed access and refresh tokens.

## Features

- **OTP Generation & Verification:** Supports both email and phone number identifiers.
- **Account Management:** Automatically creates an account if the identifier is not found.
- **Token Issuance:** Generates custom HMAC-signed Access and Refresh tokens (not standard JWTs).
- **gRPC Interface:** Communicates internally with other services (like the Gateway) via gRPC.

## Tech Stack

- **Framework:** NestJS
- **Database:** PostgreSQL (with Prisma ORM)
- **Cache:** Redis
- **Protocol:** gRPC

## Environment Variables

See the `.env.example` file for the required environment variables.

## Running the Service

```bash
# Install dependencies
npm install

# Start the service in development mode
npm run start:dev
```
