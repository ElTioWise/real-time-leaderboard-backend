# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **real-time leaderboard backend** built with NestJS, a progressive Node.js framework. The project uses TypeScript with modern ES2023 features and follows NestJS architectural patterns.

**Package Manager**: This project uses `pnpm`, not npm or yarn. Always use `pnpm` for dependency management.

## Common Commands

### Development
```bash
# Install dependencies
pnpm install

# Run in development mode with hot-reload
pnpm run start:dev

# Run in production mode
pnpm run start:prod

# Run with debugging enabled
pnpm run start:debug
```

### Building
```bash
# Build the project
pnpm run build
```

### Testing
```bash
# Run unit tests
pnpm run test

# Run unit tests in watch mode
pnpm run test:watch

# Run single test file
pnpm run test -- path/to/test.spec.ts

# Run e2e tests
pnpm run test:e2e

# Generate test coverage report
pnpm run test:cov

# Debug tests
pnpm run test:debug
```

### Code Quality
```bash
# Run ESLint and auto-fix issues
pnpm run lint

# Format code with Prettier
pnpm run format
```

## Architecture

### Module Structure
This is a NestJS application following the modular architecture pattern:

- **Modules** (`@Module()`): Organize application components into cohesive units
- **Controllers** (`@Controller()`): Handle incoming HTTP requests and return responses
- **Services** (`@Injectable()`): Contain business logic and are injected via dependency injection
- **Providers**: Services and other injectable classes

### Entry Point
The application bootstraps in `src/main.ts`, creating a NestJS application from `AppModule` and listening on port 3000 (or `process.env.PORT`).

### TypeScript Configuration
- Uses `nodenext` module resolution with ESM interop
- Decorators enabled (`experimentalDecorators`, `emitDecoratorMetadata`)
- Compiled output goes to `dist/` directory
- `noImplicitAny` is disabled - type inference is more lenient

### Testing Framework
- **Unit Tests**: Jest with `*.spec.ts` files co-located with source code in `src/`
- **E2E Tests**: Located in `test/` directory with `*.e2e-spec.ts` naming convention
- Uses `@nestjs/testing` for creating test modules
- E2E tests use `supertest` for HTTP assertions

## Code Style

### ESLint Rules
- TypeScript ESLint with type-checking enabled
- `@typescript-eslint/no-explicit-any`: disabled
- `@typescript-eslint/no-floating-promises`: warning only
- `@typescript-eslint/no-unsafe-argument`: warning only

### Prettier Configuration
- Single quotes preferred
- Trailing commas required

## Creating New Components

Use NestJS CLI schematics to generate components:

```bash
# Generate a new module
pnpm exec nest generate module <name>

# Generate a new controller
pnpm exec nest generate controller <name>

# Generate a new service
pnpm exec nest generate service <name>

# Generate a complete resource (module, controller, service, DTO, entity)
pnpm exec nest generate resource <name>
```

## Project-Specific Notes

- This is a **real-time leaderboard** backend, suggesting future implementation of WebSocket or Server-Sent Events for live updates
- Currently in early stages with basic NestJS scaffolding
- No database layer configured yet (likely future addition for leaderboard persistence)
- No authentication/authorization configured yet (likely future requirement)
