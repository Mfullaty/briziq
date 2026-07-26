# **Addendum: Nigerian Agri-Export Platform**

## **Decisions**

- **2026-07-14:** Pre-seed stage. Market validation is pending. The PRD acts as a hypothesis document for seed funding. Scope is set aggressively (all features in V1) to demonstrate the full platform vision to investors.
- **2026-07-14:** Verification tiers defined. "Confident" \= online AI \+ human desk review. "Trusted" \= physical on-site visit.
- **2026-07-14:** AI Verification will not be fully autonomous for MVP. To mitigate fraud risk with Nigerian government documents, the AI will parse and flag, but all "Confident" badges require a human Verification Officer review.
- **2026-07-14:** Payment Architecture. MVP will utilize Stripe, Paystack, and Flutterwave to handle cross-border payments and payouts. Buyers fund an Briziq-owned custodian account, and funds are disbursed to the seller's connected gateway account upon release.
- **2026-07-14:** Escrow Release Logic. The escrow utilizes a dual-trigger system to protect both parties. Primary trigger: Buyer clicks "Received." Fallback trigger: 7-day auto-release timer begins upon verified logistics delivery.
- **2026-07-14:** Dispute Resolution. Dispute mediation is included as a core platform service covered by the 2% transaction fee, rather than a paid premium add-on, to guarantee baseline trust and fairness.

## **Rejected Alternatives**

- **Fully Autonomous AI Verification:** Rejected for MVP. The technical risk of AI failing to detect sophisticated photoshopped documents is too high for a platform selling "Trust."
- **Custom Ledger / Banking Infrastructure:** Rejected for MVP. The platform will leverage existing compliance-heavy gateways (Stripe/Paystack/Flutterwave) rather than attempting to build proprietary money-transmitter architecture.
- **Buyer-Only Escrow Release:** Rejected. Giving the buyer exclusive power to release funds introduces massive "ghosting" risk for the seller. Fixed via the 7-day auto-release fallback timer.
- **Paid Dispute Resolution:** Rejected. Charging for dispute resolution undermines the core platform value proposition (trust).

## **Architecture & Mechanism Notes**

- **AI Document Verification (The OCR/LLM Stack):** The system requires a multi-modal LLM capable of high-fidelity OCR, cross-referencing dates, and flagging visual anomalies, piping into an admin queue for human sign-off.
- **Human-in-the-Loop Scaling:** To support UJ-2, the platform requires an operational team of "Verification Officers" to do desk reviews for the Confident badge. As user volume grows, the platform's unit economics will depend on the AI's ability to minimize the time a human spends on each review.
- **Voice AI Stack:** Implementing FR-6 (Synthesized voice calls) will likely require integrating with a real-time conversational AI API (e.g., Retell AI, Vapi, or OpenAI's real-time API) bridged with Twilio for SIP/telephony.
