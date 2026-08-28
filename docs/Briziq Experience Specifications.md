## **status: draft**

# **1\. Foundation**

- **Form Factor:** Web application (desktop-first for Sarah's procurement dashboard, fully responsive mobile web for Tunde in the field).
- **UI System:** shadcn/ui (heavily customized for Neumorphism) \+ Tailwind CSS v4.
- **Visual Identity:** See DESIGN.md. Note: Spines win on conflict with any generated mockup or wireframe.

# **2\. Information Architecture**

mindmap  
 root((Briziq))  
 Landing  
 Animated Trust Prompts  
 Global Search Well  
 Smart Carousel (Premium/Trusted)  
 Search Results  
 Market Intelligence (Stamped Data)  
 Recommended Exporters (Extruded Cards)  
 Buyer Escrow  
 Secure Trade Vault Container  
 Payment Gateway (Inset Well)  
 Dispute Mediation  
 Seller Dashboard  
 Export Readiness Engine (Stamped Flat)  
 Document Upload Wells (Deep Inset)  
 Inventory Management

# **3\. Voice and Tone**

The voice is authoritative, objective, and guiding. We do not use overly enthusiastic sales language. We present facts (Market Intelligence) and provide actionable coaching (Export Readiness).

# **4\. Component Patterns**

- **Primary CTA Button:** Triggers major state changes. Because it lacks a distinct background color, labels must be highly active verbs.
- **File Uploader Well:** Deep intrusion (inset shadow). Looks physically capable of receiving an object.
- **Market Intelligence / AI Coaching:** Completely flat. Stamped directly onto the UI background right next to actionable areas without any holding containers or shadows.
- **Exporter Cards:** Extruded off the background layer. The highest visual hierarchy on these cards is the Verification Badge, treated as a deep, engraved inner-shadow seal.
- **Escrow Vault Container:** An exaggerated, heavily extruded structural frame used exclusively for checkout and escrow holding, visually communicating impenetrable security.

# **5\. State Patterns**

- **Disabled / Blocked:** Elements flatten completely into the base background (no shadows). Text opacity reduced to {colors.light.text-muted} but hits WCAG AA contrast.
- **Empty Search State (Landing):** The search bar acts as the hero element. Softly fades prompts: _"Search for Products..."_ → _"Search Trusted Exporters..."_ → _"Looking for Genuine Agro Marketplace?"_ → _"What should I export today?"_

# **6\. Interaction Primitives**

- **Pressing:** All clickable elements physically depress into the background (outer shadow transitions to inset shadow) on pointerdown.

# **7\. Accessibility Floor**

- **Contrast:** All text inside interactive elements must hit strict WCAG AA contrast against the base color (\#ECF0F3).
- **Keyboard Focus:** Tabbing triggers a high-contrast standard focus ring, as Neumorphic shadows are rarely visible enough for keyboard context.

# **8\. Key Flows**

### **UJ-1: Sarah securely funds an escrow for verified ginger exports**

journey  
 title UJ-1: Sarah's path to trusted procurement  
 section Discovery  
 Read animated hero prompts: 5: Sarah  
 Search minimalist UI well: 5: Sarah  
 Read stamped market intelligence: 4: Sarah  
 View extruded exporter cards: 5: Sarah  
 section Due Diligence  
 Notice deep engraved 'Confident' seal: 5: Sarah  
 Consult AI Assistant on logistics: 4: Sarah  
 section Transaction  
 Initiate Secure Trade: 5: Sarah  
 View Heavy Escrow Vault UI: 5: Sarah  
 Fund inside inset gateway via Escrow.com: 5: Sarah

- **1\. The Landing:** Sarah arrives unauthenticated. Above a deep, inset search well, text softly fades through prompts: _"Search Trusted Exporters...", "Looking for Genuine Agro Marketplace?", "What should I export today?"_. Below sits an extruded carousel of premium exporters.
- **2\. The Query:** She types "Split dried ginger 250 metric tons Germany" and hits enter. Stamped directly onto the flat background, she reads the Market Intelligence. Floating above this background are 3 extruded Recommended Export Partner cards.
- **3\. Due Diligence:** She spots the "Confident" engraved seal deeply inset on Tunde's card. She clicks it, consulting the AI Assistant to verify his NXP certificates.
- **4\. Escrow Initiation:** Sarah clicks "Request Secure Trade." The UI shifts entirely. A massive, heavily extruded "Vault Door" container appears. Inside its thick frame is a deeply inset well holding the Escrow.com payment gateway. It physically feels like she is placing the $50,000 inside a secure safe.

### **UJ-2: Tunde builds his export reputation**

journey  
 title UJ-2: Tunde's path to export readiness  
 section Onboarding  
 Log in to dashboard: 5: Tunde  
 View flat AI coach text: 4: Tunde  
 section AI Coaching  
 Drag CAC into deep upload well: 5: Tunde  
 Read flat stamped missing-items list: 4: Tunde  
 section Verification  
 Upload phytosanitary certs: 5: Tunde  
 Wait for human desk review: 4: System  
 Achieve engraved Confident Badge: 5: Tunde

- **1\. Onboarding:** Tunde logs in. The dashboard presents an "Export Readiness Score" stamped flatly on the background.
- **2\. AI Coaching:** Next to the score are deeply inset upload wells. The flatly stamped AI text guides him: "Upload your CAC and export licenses to begin verification."
- **3\. Interaction:** Tunde drags his PDF into the inset well. The AI instantly OCRs the document and updates his readiness score, stamping a checklist of missing items for the German market.
- **4\. Resolution:** He uploads the missing certificates. A human desk review is triggered, and upon approval, Tunde is awarded the heavy, deeply engraved "Confident" seal on his card.
