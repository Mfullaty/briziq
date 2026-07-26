## **status: draft name: Briziq description: AI-first B2B SaaS marketplace for verified African agricultural exports, utilizing a strict Neumorphic visual language. colors: light: background: '\#ECF0F3' shadow-dark: '\#D1D9E6' shadow-light: '\#FFFFFF' text-primary: '\#2D3748' text-muted: '\#718096' text-success: '\#276749' dark: background: '\[ASSUMPTION: \#1E1E24\]' shadow-dark: '\[ASSUMPTION: \#151519\]' shadow-light: '\[ASSUMPTION: \#27272F\]' text-primary: '\#F7FAFC' text-muted: '\#A0AEC0' text-success: '\#9AE6B4' typography: fontFamily: '\[ASSUMPTION: Inter for utility/trust\]' weights: regular: '400' medium: '500' bold: '700' rounded: md: '12px' lg: '24px' full: '9999px' spacing: 4: '16px' 6: '24px' 8: '32px' components: card: background: '{colors.light.background}' shadow: '18px 18px 30px {colors.light.shadow-dark}, \-18px \-18px 30px {colors.light.shadow-light}' radius: '{rounded.lg}' button-primary: background: '{colors.light.background}' shadow-default: '18px 18px 30px {colors.light.shadow-dark}, \-18px \-18px 30px {colors.light.shadow-light}' shadow-pressed: 'inset 18px 18px 30px {colors.light.shadow-dark}, inset \-18px \-18px 30px {colors.light.shadow-light}' shadow-disabled: 'none' radius: '{rounded.full}' input: background: '{colors.light.background}' shadow: 'inset 18px 18px 30px {colors.light.shadow-dark}, inset \-18px \-18px 30px {colors.light.shadow-light}' radius: '{rounded.md}' upload-well: background: '{colors.light.background}' shadow: 'inset 24px 24px 40px {colors.light.shadow-dark}, inset \-24px \-24px 40px {colors.light.shadow-light}' radius: '{rounded.lg}' badge-verified: background: '{colors.light.background}' shadow: 'inset 10px 10px 20px {colors.light.shadow-dark}, inset \-10px \-10px 20px {colors.light.shadow-light}' radius: '{rounded.full}' escrow-vault: background: '{colors.light.background}' shadow: '30px 30px 60px {colors.light.shadow-dark}, \-30px \-30px 60px {colors.light.shadow-light}' radius: '{rounded.lg}' data-readout: background: 'transparent' shadow: 'none'**

# **1\. Brand & Style**

Briziq is an intelligent, high-trust B2B environment. The Neumorphic aesthetic is used to create a tactile, grounded sense of reality for digital documents and escrow holding. We commit strictly to this physical metaphor: elements protrude (outer shadow) when they can be interacted with, and intrude (inner shadow) when they are pressed, meant to receive input, or intended to look like an engraved seal of authenticity.

# **2\. Colors**

We use a monochromatic base (\#ECF0F3) to let the shadows do the work. High-contrast text is the only exception, ensuring WCAG compliance for legibility.

# **3\. Typography**

\[ASSUMPTION\] We utilize Inter for its highly legible, neutral, and structurally sound geometric properties. It pairs well with heavy shadows without competing for attention.

# **4\. Layout & Spacing**

\[ASSUMPTION\] The layout relies heavily on negative space (generous padding, e.g., 32px between major sections) to allow the broad Neumorphic shadow blurs (up to 30px spread) to render without overlapping and muddying the interface.

# **5\. Elevation & Depth**

Neumorphism relies entirely on elevation to denote hierarchy. We use outer shadows (extrusion) for containers, cards, and default button states. We use inner shadows (intrusion) for text inputs, document drop zones, pressed states, and deeply engraved verification seals. Complete flatness denotes elements that are disabled or raw data stamped directly onto the background.

# **6\. Shapes**

Soft, generous corner radii (24px for major containers and upload wells, pill-shapes 9999px for buttons and seals) to support the extruded shadow effects without creating sharp, jarring contrast points.

# **7\. Components**

- **Card:** Extruded surface. Content sits flush.
- **Button (Primary):** Extruded pill shape. Transits to intruded (inset) shadow on :active and :focus. Flattens completely (no shadow) on :disabled.
- **Input & Upload Wells:** Intruded surface. The upload well has an exaggerated deep inner shadow to act as a physical receptacle for dragged documents.
- **Escrow Vault:** A massively extruded container (60px shadow spread) to visually simulate a heavy, impenetrable safe.
- **Data Readout & AI Feedback:** Flat text stamped directly on the background. No shadows.
- **Verification Badge:** Deeply indented, inner-shadow pill shape. Acts visually like a heavy, engraved seal stamped directly into an extruded card.
