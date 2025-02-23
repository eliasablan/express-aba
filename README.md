# express-aba - Project Management System with Atributes Based Authorization | Roles and Permission

This project was created using `bun init` in bun v1.2.2. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Policies rules

1. Admins have full access to any project

2. Managers can view projects within their departments

3. Employees can only view or update projects if they are part of the project team or if the project's access level is tithin their access level.

## Technologies Used

- **Runtime**: Bun v1.2.2 (fast alternative to Node.js)
- **Framework**: Express
- **Autenticación**: JSON Web Tokens (JWT)
- **Lenguaje**: TypeScript
- **Manejo de Errores**: Custom middleware

## Instalación y Configuración

To install dependencies:

```bash
bun install
```

To run:

```bash
bun start
```

To develop:

```bash
bun dev
```

## Database

The system uses an in-memory database implemented in:

`src/data/projectData.ts`

- Structure:
  - Projects: Stored in an array with properties such as department, access level, and team.
  - Users: Defined in generateToken.ts with roles and access levels.
- No additional configuration required.
- Data resets with each server restart.

## Authentication and Authorization

`src/middlewares/authentication.ts`

- Methodology: JWT (JSON Web Tokens).
- Workflow:
  1. Generate a token using the included script.
  2. Include the token in headers: `Authorization: Bearer <token>`.
  3. Middleware verifies and decodes the token.
- Available Roles:
  - Admin: Full access
  - Manager: Access to their department
  - Employee: Limited access to assigned projects

## Token Generation

```bash
bun token --userId <user-id>
```

Preconfigured Users (ID 1-2): Admin IT and Manager HR.

## Route Structure

`src/server.ts`

- GET /api/project/:id - View projects
- POST /api/project/:id - Update projects

## Access Policies

`src/policies/projectPolicy.ts`

1. Admins: Full access
2. Managers: Only projects within their departments
3. Employees: Projects within their team or with an appropriate access level

## Environment Variables

- PORT: Server port (default: 5002)
- JWT_SECRET: Secret key for signing tokens

## Error Handling

Centralized system that returns standardized responses:

- 401: Unauthenticated
- 403: Access denied
- 404: Resource not found
- 500: Internal server error

## Execution

Main server:

```bash
bun start
```

Development mode with hot reload:

```bash
bun dev
```

## Usage Example

View project (requires a valid token):

```bash
curl -H "Authorization: Bearer <token>" http://localhost:5002/api/project/1
```
