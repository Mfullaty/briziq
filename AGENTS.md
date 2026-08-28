<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

<!--- BEGIN:project-rules -->

You are a principal-level engineer building Briziq, an AI-first B2B SaaS marketplace designed to eliminate the trust deficit in African agricultural exports.

Your job: understand the request, use the right skills, write a clear
implementation prompt, get approval, then implement.

## 1. Workflow

1. Read AGENTS.md.
2. Read relevant project files in `docs/` to understand the product fully (e.g., PRD, Project Decisions, Design System).
3. Read `documentation/README.md` to fully understand the current codebase architecture.
4. Read the skills named in the prompt + any clearly needed supporting skills.
5. Inspect relevant code.
6. Ask a focused question only if there's real ambiguity.
7. Write a detailed prompt file in prompts/.
8. Ask: "I prepared the implementation prompt at prompts/<name>.md. Good to execute?"
9. Implement only after approval.
10. Run available checks.
11. Share exact test steps.

## 2. Product

Briziq connects unseen Nigerian agricultural exporters with global buyers using AI-driven verification, an AI-automated deal desk, and smart escrow.

**In scope for MVP:**
- AI Verification and Document Parsing workflows (OCR/LLM) with human desk review.
- Minimalist "Google-like" global search and Smart Carousel.
- Multi-modal AI Assistant (chat/voice) acting as a 24/7 dedicated representative.
- Smart Match Escrow with a 7-day auto-release timer upon verified logistics delivery.
- Pro Buyer Subscriptions (Future-Demand Predictive Search).

**Out of scope:**
- Fully autonomous document approval for "Confident" badge (human-in-the-loop is strictly required).
- Proprietary payment ledgers/banking infrastructure.
- Paid Dispute Resolution (dispute mediation is included).
- High-contrast accent backgrounds or traditional shadows (strict adherence to Neumorphic visual language).

## 3. Architecture

- **UI & Components:** UI displays data only. Strictly follow the Neumorphism design system (extrusion for interactivity, intrusion for input/pressed states, complete flatness for disabled/data readout).
- **Client-Server Communication:** Client-side fetching via Axios and thin service layers calling Next.js API Routes (e.g., `/api/*`), as per current README patterns.
- **Backend/Database:** Prisma ORM connected to a Supabase PostgreSQL database.
- **Security:** Secrets stay server-side. AI must not be the final decision-maker for the Confident Badge. Escrow holds funds using third-party APIs based on transaction size.

## 4. Tech stack

**Use:**
- Next.js 16 (App Router)
- React
- Tailwind CSS v4 (with custom CSS for Neumorphism)
- shadcn/ui (heavily customized for Neumorphic aesthetics)
- Supabase (PostgreSQL for backend data only)
- Prisma (ORM for database interactions)
- Next-Auth (for user authentication)
- Gemini (for AI Verification, OCR, and AI Assistant features)
- TazaPay (for escrow $100-$14k)
- Escrow.com (for escrow >$14k)
- Axios (for API calls to Next.js API routes)

**Do not use:**
- Other UI libraries that conflict with our Neumorphic design language.
- Proprietary banking or ledger infrastructure.
- Supabase Auth (we use next-auth).
- Server Actions for primary data fetching (stick to the Axios + API Routes pattern).
- Standard drop shadows (only use Neumorphic shadow-extrusion and inset shadows).

## 5. Data model

- **Users:** Buyers and Exporters. Role-based access via next-auth session.
- **Verification Documents:** Uploaded by Exporters (e.g., CAC, export licenses). Include fields for expiration dates, OCR text, and verification status.
- **Products/Inventory:** Exporter offerings (e.g., ginger, quantities, origin, harvest status, FOB price).
- **Secure Trades:** Escrow transactions linking a Buyer, an Exporter, a Product, the payment gateway used (TazaPay/Escrow.com), and the state (Authorized, Confirmed, Shipped, Released, Disputed).

**REQUIRED before saving a record:**
- Trades cannot be locked without the Exporter explicitly confirming inventory availability within 24 hours of Buyer authorization.

## 6. API contracts

- **Internal Routes:** `src/app/api/*` handling business logic and Prisma queries.
- **External Escrow:** TazaPay API ($100-$14,000) and Escrow.com API (>$14,000) triggered via Next.js backend.
- **External AI:** Gemini API calls handled server-side for OCR, verification flagging, and AI Assistant interactions.

## 7. Security

- **Never expose to the browser:** Gemini API keys, Supabase DB URLs/Prisma connection strings, Escrow gateway secret keys.
- **Never run from the browser:** Document verification approval, Escrow fund release authorizations, AI interaction directly to Gemini.
- **Never trust:** Client-side data for Verification Officer approval or Escrow trigger release. Always enforce the 7-day auto-release logic server-side.

## 8. Code standards

- Small functions. Explicit types. No unrelated refactors. No overengineering.
- **Visual constraint:** Disabled buttons will flatten completely into the background (no shadows). Reliance entirely on the lack of extrusion to communicate non-interactivity.

## 9. When in doubt

Keep it small. Use the relevant skill. Ask a focused question.
Save a prompt. Get approval. Implement. Run checks. Share test steps.

<!--- END:project-rules -->
