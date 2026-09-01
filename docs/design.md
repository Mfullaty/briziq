# Briziq Design System

## Art Direction
Briziq uses a strict **Neumorphic** philosophy tailored for a high-trust B2B SaaS marketplace. Our goal is to eliminate the trust deficit through tactile, physically grounded digital elements. 

## Build Mandate
- **Extrusion for Interactivity**: Elements that can be clicked, pressed, or interacted with (like buttons and cards) must appear extruded (raised).
- **Intrusion for Inputs and Pressed States**: Elements that accept data input, or represent an active pressed state, must appear intruded (engraved/inset).
- **Flatness for Disabled / Data**: Disabled buttons or purely read-only data must be completely flat (no shadows). This strict visual constraint uses the *lack* of extrusion to communicate non-interactivity.
- **Banned Elements**: Standard drop shadows and high-contrast accent backgrounds are completely out of scope. Use only the defined Neumorphic shadow tokens.

## Shadow Tokens
The tokens live in our CSS framework (Tailwind config) and map to these specific behaviors:
- **`neo`**: Extrusion (raised element). Used for Primary Actions, Exporter Cards.
- **`neo-inner`**: Intrusion (inset element). Used for Inputs, Engraved Verification Badges.
- **`neo-deep`**: Deep intrusion. Used for large drop zones like the Deep Inset Upload Well.
- **`neo-flat`**: Flattens the element (removes box-shadow). Used for disabled states.

## Color Palette
- **Base Background**: `--base` (Light grayish blue). Ensure the body background matches this color exactly to make the shadows blend perfectly.
- **Shadows**:
  - `--shadow-dark`: The dark bottom-right shadow (extrusion) or top-left shadow (intrusion).
  - `--shadow-light`: The bright top-left shadow (extrusion) or bottom-right shadow (intrusion).
- **Accents**: Deep green (`#10b981`) for verified/success states, red for error states.

## Typography
- Clean sans-serif (Inter).
- Use proper hierarchy with standard Tailwind typography classes.
