# Epic 2 Authentication Completion and Chart Deployment Fix

## Goal

Remove the TypeScript deployment errors in `src/configs/chart.config.ts` and complete every remaining item in Epic 2 without starting Epic 3 work beyond the minimal role and credential fields required for authentication.

## Existing constraints

- Preserve the Next.js App Router, NextAuth, Axios to API Routes, Prisma, and Supabase PostgreSQL architecture.
- Keep all secrets and database access on the server.
- Do not use Supabase Auth, Server Actions for primary client data fetching, or client supplied role values for privileged accounts.
- The sign-up UI may offer only `BUYER` and `EXPORTER`. `ADMIN` and `VERIFICATION_OFFICER` are assigned through a server controlled administrative or seed path, never by public registration.
- Continue using the established Neumorphic component system. Inputs remain inset, interactive surfaces extruded, and disabled controls flat.
- Read the applicable Next.js 16 documentation, the Supabase skill guidance, and current official Prisma and NextAuth documentation before changing authentication or database code.

## Required implementation

### 1. Fix the deploy blocking chart types

- Update both `tooltipHoverFormatter` implementations in `src/configs/chart.config.ts` to handle the optional formatter options argument.
- Stop reading the undeclared `dataPointIndex` property from `ApexLegendFormatterOpts`.
- Preserve an informative legend label by using a type supported series value when it is present and gracefully falling back to the series name when it is not.
- Keep the two default chart configurations behaviorally consistent.

### 2. Create a real role aware user foundation

- Extend the Prisma user representation with a `Role` enum containing `BUYER`, `EXPORTER`, `ADMIN`, and `VERIFICATION_OFFICER`.
- Add only the durable authentication fields necessary in this epic, including a unique email, display name, role, securely hashed credential storage, and timestamps. Defer Epic 3 profile and marketplace fields to Epic 3.
- Replace mock credential validation with a server only database lookup and constant time password hash verification.
- Implement a complete sign-up API route with request validation, normalized email handling, duplicate email conflict handling, and secure password hashing.
- Ensure the chosen Prisma version and generated client or contract workflow can safely create and read users. Add a migration or schema artifact according to the repository's established database workflow, not an ad hoc runtime schema change.
- Do not log passwords, hashes, database URLs, OAuth secrets, or raw server exceptions.

### 3. Integrate roles with NextAuth

- Add explicit NextAuth and JWT type augmentation for user ID and Briziq role.
- Include the persisted user ID and role in JWT and session callbacks for credentials and OAuth sessions.
- Define a safe role rule for first time OAuth users that defaults them to `BUYER`; never infer an administrative role from an OAuth profile.
- Correct the configured custom sign-in and error pages so unauthenticated users reach `/sign-in` rather than the protected dashboard.

### 4. Complete the sign-up flow

- Add an accessible Buyer or Exporter role selection to the existing sign-up form.
- Extend the client request types and API payload so the selected public role is sent to the API route and validated again server side.
- Surface API validation and duplicate email failures in the existing form error alert, and preserve the success notification and redirect to sign in.
- Do not change the OAuth provider configuration except where required to attach the persisted role to the session.

### 5. Enforce role based access

- Implement middleware that continues to allow NextAuth API routes and explicit public routes, redirects unauthenticated requests to sign in with their return URL, redirects signed in users away from auth pages, and checks a protected route's configured `authority` against the role in the authenticated token.
- Route authenticated but unauthorized users to `/access-denied` without creating a redirect loop.
- Update route configuration so its authority values use the new Briziq roles consistently.
- Ensure the existing navigation authority filtering consumes the session role through the current `authority` compatibility field or a deliberately migrated role based equivalent.

### 6. Add a user profile page

- Add a protected profile route that displays the signed in user's name, email, and role, and permits editing the supported profile fields for the current Epic 2 schema.
- Implement profile read and update API routes, protected on the server using the authenticated session user ID rather than a browser provided ID.
- Add a thin Axios service for those API routes, with client components using it for their data operations.
- Validate profile update input server side and return actionable, non sensitive errors.
- Register the route and navigation entry with role appropriate authority.

### 7. Quality and project records

- Add focused tests for the extracted server validation or authorization helpers where the installed test tooling permits. At a minimum, validate the chart TypeScript fix through production build type checking.
- Run formatting checks and the production build. Resolve only failures caused by this scope; report unrelated existing failures precisely.
- Update `docs/project_tracker.md` only after the implementation is complete: mark the six remaining Epic 2 items complete with `2026-09-19`, update Epic 2 progress to 11/11, and add an Update Log entry.

## Acceptance criteria

1. `npm run build` no longer reports any `opts` optionality or `dataPointIndex` errors in `src/configs/chart.config.ts`.
2. A visitor can create a Buyer or Exporter account, but cannot create an Admin or Verification Officer account through sign-up.
3. Credentials sign-in verifies a stored password hash and sessions expose the persisted user ID and role with correct TypeScript types.
4. Unauthenticated visitors cannot access protected routes, and authenticated users cannot access routes that do not permit their role.
5. A signed in user can view and update their allowed profile information through protected API routes and the Neumorphic profile UI.
6. No secret, plaintext password, or password hash reaches browser code or logs.
7. The tracker reflects completed Epic 2 work only when all of the above behavior has been implemented and checked.

## Out of scope

- Full Epic 3 user profile fields, database connection provisioning, and the remaining marketplace schema.
- Password reset email delivery and account recovery token design beyond the existing scaffold.
- New admin user management UI or verification workflow.
- Changes to unrelated UI components or navigation beyond the routes necessary for Epic 2.
