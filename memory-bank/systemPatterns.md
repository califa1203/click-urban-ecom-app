# System Patterns

## Architecture Overview

The Click Urban e-commerce platform follows a modern web application architecture using Next.js, with a clear separation of concerns between frontend and backend components.

```mermaid
graph TD
    A[Client Browser] --> B[Next.js Frontend]
    B --> C[Next.js API Routes]
    C --> D[PostgreSQL Database]
    C --> E[External APIs]
    
    subgraph Frontend
        B --> F[React Components]
        F --> G[UI Components]
        F --> H[Page Components]
        F --> I[Layout Components]
    end
    
    subgraph Backend
        C --> J[Authentication]
        C --> K[Product Management]
        C --> L[Order Processing]
        C --> M[Content Management]
        C --> N[Admin Functions]
    end
    
    subgraph External
        E --> O[Payment Gateways]
        E --> P[Dropshipping APIs]
        E --> Q[AI Services]
        E --> R[Social Media APIs]
    end
```

## Key Design Patterns

### Frontend Patterns

1. **Component-Based Architecture**
   - Reusable UI components for consistent design
   - Composition pattern for building complex interfaces
   - Container/Presenter pattern for separating logic from presentation
   - Layout components (Header, Footer, MainLayout) for consistent structure

2. **Design System**
   - CSS variables for theming and consistent styling
   - Light/dark mode toggle with system preference detection
   - Responsive design with mobile-first approach
   - Utility classes for common styling patterns

3. **State Management**
   - Context API for global state (ThemeProvider)
   - Local component state for UI-specific state (menu toggle, form inputs)
   - Server state management for data fetching and caching (planned)

4. **Routing & Navigation**
   - Next.js App Router for file-based routing
   - Dynamic routes for product pages and categories
   - Middleware for authentication and route protection (planned)

### Backend Patterns

1. **API Design**
   - RESTful API endpoints for CRUD operations
   - API Routes organized by domain (products, users, orders)
   - Consistent error handling and response formatting

2. **Data Access**
   - Repository pattern with Prisma ORM
   - Data validation at API boundaries
   - Transaction management for complex operations

3. **Authentication & Authorization**
   - Token-based authentication
   - Role-based access control
   - Multi-factor authentication flow

## Core Implementation Paths

### User Journey

```mermaid
sequenceDiagram
    actor User
    participant Frontend
    participant API
    participant Database
    participant External

    User->>Frontend: Browse Products
    Frontend->>API: Request Products
    API->>Database: Query Products
    Database-->>API: Return Products
    API-->>Frontend: Display Products
    
    User->>Frontend: Add to Cart
    Frontend->>Frontend: Update Cart State
    
    User->>Frontend: Checkout
    Frontend->>API: Create Order
    API->>Database: Save Order
    API->>External: Process Payment
    External-->>API: Payment Confirmation
    API->>Database: Update Order Status
    API-->>Frontend: Order Confirmation
    Frontend-->>User: Success Message
```

### Admin Journey

```mermaid
sequenceDiagram
    actor Admin
    participant Dashboard
    participant API
    participant Database
    participant External

    Admin->>Dashboard: Login
    Dashboard->>API: Authentication
    API-->>Dashboard: Auth Token
    
    Admin->>Dashboard: Manage Products
    Dashboard->>API: CRUD Operations
    API->>Database: Update Products
    
    Admin->>Dashboard: View Analytics
    Dashboard->>API: Request Data
    API->>Database: Query Sales/User Data
    Database-->>API: Return Analytics
    API-->>Dashboard: Display Metrics
    
    Admin->>Dashboard: Use AI Assistant
    Dashboard->>API: AI Request
    API->>External: AI Service Call
    External-->>API: AI Response
    API-->>Dashboard: Display Results
```

## Data Models

### Core Entities

1. **User**
   - Authentication details
   - Profile information
   - Roles and permissions

2. **Product**
   - Basic information (name, description, price)
   - Media (images, videos)
   - Variants (size, color, etc.)
   - Inventory status
   - Dropshipping source details

3. **Order**
   - Order items and quantities
   - Customer information
   - Payment details
   - Shipping information
   - Status tracking

4. **Content**
   - Blog posts
   - Marketing materials
   - SEO metadata

## Scalability Considerations

- Server-side rendering for performance and SEO
- Edge caching for static content
- Database indexing for query performance
- Pagination for large data sets
- Image optimization and CDN usage
