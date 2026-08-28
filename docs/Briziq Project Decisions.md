* **Tech Stack:** Next.js 16, Tailwind CSS v4, shadcn/ui.
* **Backend:** Prisma ORM connected to a Supabase PostgreSQL database. Client-side fetching via Axios and thin service layers calling Next.js API Routes.
* **AI Provider:** Gemini for OCR, verification flagging, and AI Assistant interactions.
* **Escrow Providers:** TazaPay (for $100-$14,000) and Escrow.com (for >$14,000).
* **Visual Direction:** Neumorphism (Light and Dark modes required).
* **Scope:** V1 aggressive; all features included to secure seed funding.  
* **Escrow Logic:** 7-day auto-release timer upon verified logistics delivery.  
* **Verification:** Human-in-the-loop required for "Confident" badge; AI does parsing only.  
* **Visual Constraint (2026-07-18):** Strict adherence to Neumorphic shadow-extrusion for all UI elements, including primary CTAs. No high-contrast accent backgrounds. Rely entirely on outer/inner shadows to denote state.  
* **Disabled State Constraint (2026-07-18):** Disabled buttons will flatten completely into the background (no shadows). This relies entirely on the lack of extrusion to communicate non-interactivity.  
* **Landing Page Hero (2026-07-18):** Instead of a traditional hero image, utilize rotating animated text prompts (e.g., "Search Trusted Exporters...") directly above the primary search input.  
* **Search Results Layout (2026-07-18):** Market Intelligence stats will be "stamped" directly onto the flat background (no containers or shadows) to create structural contrast against the heavily extruded Exporter Cards.  
* **Trust Hierarchy (2026-07-18):** Exporter cards are extruded, with "Trusted" or "Confident" badges acting as the absolute highest visual hierarchy element on the card.  
* **Badge Visual Metaphor (2026-07-18):** Verification badges are structured as deeply indented "engraved seals" (heavy inner shadows) carved directly into the extruded exporter cards.  
* **AI Dashboard Interaction (2026-07-18):** The AI Coach is not a floating chat bubble. It is structurally integrated into the seller dashboard. Actionable areas (document drop zones) are deeply inset wells, and contextual AI feedback/scores are stamped completely flat next to them.  
* **Escrow Vault UI (2026-07-18):** The Escrow / Checkout screen utilizes a unique "Vault Door" component—a massively extruded container that frames a deeply inset payment gateway well, maximizing the physical feeling of security for high-value transactions.