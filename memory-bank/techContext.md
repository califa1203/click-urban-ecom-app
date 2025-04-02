# Technology Context

## Frontend Technologies
- **Framework**: Next.js 15
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API or Zustand (to be determined)
- **UI Components**: Custom components with Tailwind, potentially shadcn/ui

## Backend Technologies
- **API Routes**: Next.js API Routes
- **Database**: PostgreSQL via Supabase
- **ORM**: Prisma
- **Database Schema**:
  - User model with role-based permissions
  - Product model with variants and categories
  - Order model with line items and status tracking
  - Content model for blog posts and marketing materials
  - Address model for shipping and billing
- **Authentication**: Enhanced security with:
  - Multi-factor authentication (MFA)
  - Passwordless options (biometrics, social logins)
  - Token-based authentication

## Payment Processing
- **Primary Gateway**: Stripe
- **Additional Methods**: 
  - Apple Pay
  - Google Pay

## Infrastructure & Deployment
- **Hosting**: Vercel (planned)
- **Image Storage**: Cloudinary or AWS S3 (to be determined)
- **CI/CD**: GitHub Actions (planned)

## Third-Party Integrations (Planned for Later Phases)
- **AI Services**: OpenAI API or similar (for product research, content generation)
- **Dropshipping**: 
  - AliExpress
  - Amazon
  - Printify
  - Printful
- **Analytics**: Google Analytics, custom analytics
- **Email Marketing**: To be determined

## Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Build Tool**: Turbopack (via Next.js)

## Development Approach
- Phase-by-phase implementation to ensure quality
- Focus on completing each phase fully before moving to the next
- Technology decisions for later phases will be revisited when those phases begin
