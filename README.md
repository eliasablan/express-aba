# express-aba

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.2. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Policies rules

1. Admins have full access to any project

2. Managers can view projects within their departments

3. Employees can only view or update projects if they are part of the project team or if the project's access level is tithin their access level.
