# Shoe Store - Premium Footwear

## Overview

This is an interactive 3D shoe showcase application built as a modern e-commerce experience. The application features immersive 3D product visualization with real-time rendering, allowing users to explore premium footwear through an engaging web interface. Users can rotate shoes, switch between different color variants, and navigate through multiple products with smooth transitions and animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, built using Vite as the build tool and development server.

**3D Rendering**: The application uses React Three Fiber (R3F) as a declarative wrapper around Three.js, with Drei providing helpful utilities and abstractions. GLSL shaders are supported through a Vite plugin for custom visual effects. The 3D scene includes particle effects, lighting environments, and interactive model controls.

**UI Components**: Built on Radix UI primitives with custom styling through Tailwind CSS. The component library follows a shadcn/ui pattern with extensive use of class-variance-authority for managing component variants. Framer Motion handles all animations and transitions for smooth user experiences.

**State Management**: 
- TanStack Query (React Query) for server state management and data fetching
- Zustand for client-side state, specifically managing game/interaction phases and audio controls
- The storage interface is abstracted to allow future migration from in-memory storage to database-backed persistence

**Routing**: The application appears to be a single-page application focused on the hero/showcase view, with minimal routing requirements.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript. The server uses ES modules throughout.

**Development Setup**: Vite middleware integration in development mode provides hot module replacement (HMR) and fast refresh. In production, the server serves statically built assets.

**API Structure**: RESTful API design with all application routes prefixed with `/api`. The route registration is modular and extensible through the `registerRoutes` function.

**Storage Layer**: Currently implements an in-memory storage pattern (`MemStorage`) that conforms to an `IStorage` interface. This abstraction allows seamless migration to a database-backed implementation without changing business logic. The storage interface includes basic CRUD operations for users.

**Middleware**: Custom logging middleware tracks API request duration and response data, with intelligent truncation for readability.

### Data Storage

**Database ORM**: Drizzle ORM configured for PostgreSQL, though the current implementation uses in-memory storage. The schema is centralized in `shared/schema.ts` for use across both client and server.

**Schema Design**: Currently defines a basic user table with username/password authentication. The schema uses Drizzle-Zod for validation, providing type-safe insert operations.

**Database Connection**: Configured to use Neon serverless PostgreSQL through the `@neondatabase/serverless` driver. Connection credentials are managed through environment variables (`DATABASE_URL`).

**Migration Strategy**: Drizzle Kit manages database migrations with schema changes tracked in the `./migrations` directory. The `db:push` script allows direct schema synchronization during development.

### Authentication & Authorization

Currently implements a minimal user schema with username/password fields. No authentication middleware or session management is currently implemented, suggesting this is prepared for future enhancement. The schema suggests planned password-based authentication.

### Asset Management

**3D Models**: GLTF/GLB format models stored in `/public/models/` directory. The application includes a preloading system that loads all models before the experience starts, displaying progress to users.

**Fonts**: Self-hosted Inter font family through Fontsource, eliminating external font dependencies.

**Build Configuration**: Vite is configured to handle large 3D assets (GLTF, GLB) and audio files (MP3, OGG, WAV) with appropriate asset inclusion rules.

### Key Design Decisions

**Separation of Concerns**: The codebase maintains clear boundaries between client, server, and shared code through directory structure and TypeScript path aliases (`@/` for client, `@shared/` for shared code).

**Type Safety**: Extensive use of TypeScript with strict mode enabled. Zod validation schemas ensure runtime type safety for data entering the system.

**Modular Storage Interface**: The abstraction of storage logic allows the application to start with in-memory storage and migrate to PostgreSQL without refactoring business logic. This supports rapid prototyping while maintaining production readiness.

**Progressive Enhancement**: The application structure supports adding features incrementally - authentication, shopping cart, checkout - without major architectural changes.

**Performance Optimization**: Model preloading, lazy loading through Suspense boundaries, and optimized 3D rendering reduce perceived load times and ensure smooth interactions.

## External Dependencies

### Database
- **Neon Serverless PostgreSQL**: Cloud-hosted PostgreSQL database accessed through serverless driver
- **Drizzle ORM**: Type-safe SQL toolkit and ORM for database operations

### 3D & Graphics
- **Three.js**: Core 3D rendering library
- **React Three Fiber**: React renderer for Three.js
- **@react-three/drei**: Helper utilities for R3F
- **@react-three/postprocessing**: Post-processing effects for enhanced visuals

### UI Framework
- **Radix UI**: Comprehensive collection of unstyled, accessible UI primitives (30+ components imported)
- **Tailwind CSS**: Utility-first CSS framework with custom theming
- **Framer Motion**: Animation library for React

### State & Data
- **TanStack Query**: Server state management and data synchronization
- **Zustand**: Lightweight client state management with middleware support

### Development Tools
- **Vite**: Build tool and dev server with HMR
- **TypeScript**: Static typing and enhanced developer experience
- **tsx**: TypeScript execution for server-side code
- **esbuild**: Fast JavaScript bundler for production builds

### Validation & Utilities
- **Zod**: TypeScript-first schema validation
- **date-fns**: Modern date utility library
- **clsx & class-variance-authority**: Dynamic class name management
- **nanoid**: Unique ID generation

### Additional Integrations
- **cmdk**: Command menu component
- **Replit Vite Plugin**: Runtime error overlay for development environment