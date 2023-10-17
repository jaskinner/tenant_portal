# Tenant Portal

## Description

Tenant Portal is a work-in-progress application for landlords and property managers to manage tenants' accounts. It serves as a platform for tenants to access documents, rent details, and other pertinent information.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup and Installation](#setup-and-installation)
3. [Project Structure](#project-structure)
4. [Development Scripts](#development-scripts)
5. [Tech Stack](#tech-stack)
6. [Author](#author)
7. [License](#license)

## Prerequisites

- Node.js LTS
- Docker and Docker Compose

## Setup and Installation

### Clone the Repository

```bash
git clone <repository_url>
cd <repository_directory>
```

### Build and Run with Docker

```bash
docker-compose up --build
```

This will create three services:

1. **Client**: Running on `http://localhost:8080`
2. **Server**: Running on `http://localhost:3000`
3. **Database**: MySQL running on port 42333

## Project Structure

The application consists of two main directories:

- `/client`: Frontend built with Vue.js, Vite, and Pinia.
- `/server`: Backend API built using Node.js, Express, Sequelize, and MySQL.

## Development Scripts

### Server

1. **Start the server**: `npm start`
2. **Run tests**: `npm test`

### Client

1. **Start the development server**: `npm run dev`
2. **Build for production**: `npm run build`
3. **Run unit tests**: `npm run test:unit`
4. **Run E2E tests**: `npm run test:e2e`

## Tech Stack

### Server

- Node.js
- Express
- Sequelize
- MySQL
- Jest for testing
- bcrypt for password hashing

### Client

- Vue.js
- Vite
- Pinia for state management
- Cypress for E2E testing

## Author

Jon Skinner

## License

ISC