## **title: AI-Powered Nigerian Agri-Export Platform status: final created: 2026-07-14 updated: 2026-07-14**

# **PRD: AI-Powered Nigerian Agri-Export Platform**

## **0\. Document Purpose**

This PRD defines the Minimum Viable Product (MVP) for the Briziq platform. It is written for founding engineers, potential seed investors, and operational stakeholders. It focuses on the core capability of manufacturing trust between unseen Nigerian agricultural exporters and global buyers via AI-driven verification, an AI-automated deal desk, and smart escrow. Technical architecture and operational scaling details live in the Addendum.

## **1\. Vision**

Briziq is an AI-first B2B SaaS marketplace designed to eliminate the trust deficit in African agricultural exports. Traditional directories provide visibility but leave buyers to navigate a minefield of unverified documents, communication gaps, and payment risks. Briziq replaces this friction with intelligence: actively verifying exporter compliance, predicting market demand, serving as an automated 24/7 business coach, and securing transactions in automated escrow. We don't ask global buyers to trust Nigerian exporters; we provide the objective, platform-verified evidence that earns that trust, fundamentally shifting the psychological risk of international trade.

## **2\. Target User**

### **2.1 Jobs To Be Done**

**For Global Buyers (e.g., EU Procurement Managers):**

- _Functional:_ Secure high-volume agricultural commodities quickly without navigating complex, unvetted supplier lists.
- _Emotional/Social:_ Feel confident that the funds they authorize will not be lost to fraud or non-compliance.

**For Nigerian Exporters:**

- _Functional:_ Get discovered by serious international buyers and navigate complex export compliance (CAC, NEPC, NAQS) without hiring expensive consultants.
- _Emotional/Social:_ Overcome the systemic "lack of trust" stigma associated with emerging market exports; feel guided and supported by a platform that acts as a business coach.

### **2.2 Key User Journeys**

- **UJ-1. Sarah securely funds an escrow for verified ginger exports.**
    - **Persona \+ context:** Sarah Müller, Senior Procurement Manager at Rhine Foods (Germany). Sourcing 250 MT of split ginger on a 21-day deadline, frustrated by the low-trust environment of traditional directories.
    - **Entry state:** Unauthenticated visitor on the homepage.
    - **Path:**
        - Types "Split dried ginger 250 metric tons Germany" into the single search box.
        - System displays **Market Intelligence**: active harvest status, FOB price, and shipping duration.
        - System displays 3 Recommended Export Partners with **Trust Scores** and **Confident Badges**.
        - Sarah clicks a recommended exporter and views **Export Intelligence**: verified export licenses, inspection reports, and an **AI Risk Assessment** showing "Low Risk".
        - Interacts with the AI Assistant, which confirms past EU customs success and displays Briziq-verified certificates.
        - Sarah clicks "Request Secure Trade".
    - **Climax:** System generates a **Secure Trade** summary. The UI explicitly states funds are held based on contractual shipment milestones. Sarah approves the $50,000 transfer to escrow via Escrow.com.
    - **Resolution:** The trade is locked, funds are secured, and the fulfillment process begins.

journey  
 title UJ-1: Sarah's path to trusted procurement  
 section Discovery  
 Search minimalist UI: 5: Sarah  
 View market intelligence: 4: System  
 View recommended exporters: 5: System  
 section Due Diligence  
 Analyze Export Intelligence: 5: Sarah  
 Consult AI Assistant on logistics: 4: Sarah  
 section Transaction  
 Initiate Secure Trade: 5: Sarah  
 Fund escrow via Escrow.com: 5: Sarah

- **UJ-2. Tunde builds his export reputation and achieves Confident status.**
    - **Persona \+ context:** Tunde Adebayo, owner of Adebayo Agro Exports Ltd (Kaduna, Nigeria). Has 300 MT of quality ginger but struggles to prove credibility to international buyers.
    - **Entry state:** Authenticated new user, first login to the dashboard.
    - **Path:**
        - AI greets him and prompts him to begin verification. Tunde inputs business details and uploads CAC registration and export licenses.
        - AI instantly OCRs documents, checks expiration dates, and updates progress, framing missing items as a roadmap.
        - System generates an **Export Readiness Score** of 84% and flags missing items (moisture test, phytosanitary certificate).
        - Tunde states his target market (Germany); AI generates a personalized compliance checklist.
        - Day 2: Tunde uploads the missing certificates. AI validates. A human Verification Officer performs a desk review and approves.
    - **Climax:** The **Trust Engine** calculates a score of 98/100 and awards the **Confident Badge**.
    - **Resolution:** Tunde's dashboard unlocks operational features (buyer requests, market demand). His inventory is now visible in the search results for buyers like Sarah.

journey  
 title UJ-2: Tunde's path to export readiness  
 section Onboarding  
 Create account & input business details: 5: Tunde  
 Upload CAC and export licenses: 4: Tunde  
 section AI Coaching  
 View Export Readiness Score (84%): 4: System  
 Generate Germany compliance checklist: 5: System  
 section Verification  
 Upload missing phytosanitary certs: 5: Tunde  
 Human desk review & approval: 4: System  
 Achieve Confident Badge (98/100): 5: System

## **3\. Glossary**

## **4\. Features**

### **4.1 Global Search & Market Intelligence**

**Description:** The buyer-facing "Google-like" interface. Takes natural language queries, returns market data, and presents curated, verified exporters. Realizes UJ-1. \[ASSUMPTION: We have access to real-time/frequent data feeds for Nigerian harvest cycles and accurate FOB pricing.\]

- **FR-1:** System can parse a natural language query (e.g., "Split dried ginger 250 metric tons Germany") and extract commodity, quantity, and destination constraints.
- **FR-2:** System returns real-time market insights (harvest status, estimated FOB price, shipping duration) mapped to the parsed query.

### **4.2 AI Verification & Export Readiness Engine**

**Description:** The seller-facing onboarding and compliance coach. Realizes UJ-2. \[ASSUMPTION: Our OCR \+ LLM stack is capable of accurately parsing and validating the specific layouts of Nigerian government and customs documents.\]

- **FR-3:** System accepts PDF/image uploads, extracts text via OCR, and identifies document type, expiration dates, and key identifying numbers (e.g., CAC, NXP).
- **FR-4:** System calculates a dynamic Export Readiness Score (0-100%) based on the presence and validity of required documents for a specific commodity and target country.
- **FR-5:** Verification Officers can view AI-parsed documents side-by-side with user uploads in an administrative queue to approve or reject the Confident Badge criteria.

### **4.3 AI Assistant & Automated Deal Desk**

**Description:** The automated agent that acts as a 24/7 dedicated representative for exporters.

- **FR-6:** The AI Assistant can interact with buyers via text chat and synthesized voice calls, translating languages dynamically.
- **FR-7:** The AI Assistant can check real-time stock availability, initiate shipping bookings via logistics APIs, and generate a Secure Trade contract for the buyer to fund.

### **4.4 Smart Match Escrow**

**Description:** The payment holding mechanism utilizing third-party gateways to hold buyer funds in a custodian account. Realizes UJ-1.

- **FR-8:** Buyers can initiate a Secure Trade via an "Authorization-First" flow. The system routes payments based on transaction size: TazaPay is used for transactions between $100 and $14,000, and Escrow.com is used for transactions above $14,000. Sellers must explicitly confirm inventory availability within 24 hours to capture the funds and lock the trade.
- **FR-9:** If a seller fails to confirm or rejects an authorized trade due to stale inventory, they incur a severe Trust Score penalty. To proactively manage this, the AI Assistant regularly pings sellers via WhatsApp/SMS to verify stock levels.
- **FR-10:** Buyers can click a "Shipment Received" confirmation, triggering automatic disbursement of funds to the seller, minus the 2% transaction fee.
- **FR-11:** Upon the system confirming the shipment has cleared destination customs via a unified supply chain visibility aggregator API (e.g., Project44 or FourKites), a 7-day auto-release timer begins. If the timer expires with no action from the buyer, funds are disbursed to the seller.
- **FR-12:** During the 7-day timer, the buyer can trigger a Dispute. This halts the auto-release timer and alerts an Briziq administrator for Dispute Mediation.

### **4.5 Smart Carousel (Premium Listings)**

**Description:** The hybrid trust carousel located below the search bar.

- **FR-12:** The system restricts the purchase of premium carousel slots to exporters holding a Confident Badge or Trusted Badge.
- **FR-13:** The system dynamically populates the premium carousel slots to match the exact commodity the buyer is currently searching for.

### **4.6 Future-Demand Predictive Search (Pro Subscriptions)**

**Description:** Subscription tier for global buyers to access predictive supply models.

- **FR-14:** The system analyzes global data and platform inventory to generate an interactive map of future harvest dates and predictive supply from Trusted Badge exporters.
- **FR-15:** The system restricts access to the predictive supply map to buyers who have an active, recurring weekly/monthly Pro Subscription.

## **5\. Non-Goals (Explicit)**

- **Fully Autonomous Fraud Detection:** The AI will not be the final decision-maker for the Confident Badge. Human verification is strictly required.
- **Proprietary Banking Infrastructure:** We are not building our own ledgers or acting as a bank. All money movement is handled via TazaPay and Escrow.com APIs based on transaction size thresholds.

## **6\. MVP Scope**

### **6.1 In Scope**

- All AI Verification and Document Parsing workflows (with human desk review).
- The minimalist "Google-like" search and Smart Carousel.
- The multi-modal AI Assistant (chat/voice).
- Smart Match Escrow (TazaPay for $100-$14k, Escrow.com for >$14k) with 7-day auto-release logic.
- Pro Buyer Subscriptions and Predictive Supply Maps.

### **6.2 Out of Scope for MVP**

- Fully autonomous document approval (human-in-the-loop required).
- Proprietary payment ledgers.

## **7\. Success Metrics**

- **§4.1 (FR-2):** We have access to real-time/frequent data feeds for Nigerian harvest cycles and accurate FOB pricing.
- **§4.2 (FR-3):** Our OCR \+ LLM stack is capable of accurately parsing and validating the specific layouts of Nigerian government and customs documents.
