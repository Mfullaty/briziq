# Implementation Prompt: Convert Remaining UI Components to Neumorphic Design System

## Background & Objective
Briziq uses a strict Neumorphic design philosophy tailored for a high-trust B2B SaaS marketplace. Interactivity is denoted via extrusion (`shadow-neo`), inputs/pressed states via intrusion (`shadow-neo-inner`), and disabled states via flatness (`shadow-neo-flat`). Standard drop shadows and high-contrast accent backgrounds are banned.

While most core components (Button, Input, Card, Modal/Dialog, Drawer, etc.) have been converted, several components in `src/components/ui/` have not yet been converted or have residual legacy styles:
1. **DatePicker Suite** (`DatePicker`, `DatePickerRange`, `DateTimepicker`, `CalendarBase`, `Calendar`, `RangeCalendar`, `DateTable`, `MonthTable`, `YearTable`, `Header`, `Day`):
   - Currently uses `shadow-xl`, `dark:shadow-2xl`, `bg-white`, `dark:bg-gray-800/900`, and `hover:bg-gray-100`.
   - Must be converted to `bg-base shadow-neo` panels, `hover:shadow-neo` / `shadow-neo-inner` interactive cells, and neumorphic direction controls.
2. **InputGroup & Addon**:
   - `.input-addon` currently has `border border-gray-200 bg-gray-200 dark:border-gray-700 dark:bg-gray-600`.
   - Must be converted to `bg-base shadow-neo-inner text-gray-500 dark:text-gray-400 font-semibold border-none`.
3. **Dropdown Menu CSS Cleanup**:
   - `_dropdown.css` still contains legacy `.dropdown-menu` styles (`bg-white dark:bg-gray-900 shadow-[...] border border-gray-100 dark:border-gray-800`) that conflict with the Neumorphic tokens.
   - Must be cleaned up to use `bg-base shadow-neo rounded-xl border-none`.
4. **Card CSS Cleanup**:
   - `_card.css` has `.card { @apply bg-white dark:bg-gray-800 rounded-2xl; }` which conflicts with `bg-base shadow-neo`.
   - Must be aligned with `bg-base rounded-2xl` and `shadow-neo`.
5. **Neumorphism Conversion Tracker**:
   - Update `docs/neumorphism-conversion-tracker.md` to reflect full conversion of all remaining components: DatePicker, Calendar, RangeCalendar, TimeInput, InputGroup, ScrollBar, StatusIcon, toast.
6. **Design System Showcase Page**:
   - Add demonstrations of `DatePicker`, `Calendar`, `TimeInput`, and `InputGroup` to `src/app/design-system/page.tsx` for easy visual verification.

---

## Detailed Changes

### 1. `src/assets/styles/components/_date-picker.css`
- Convert `.date-picker` to `@apply z-40 max-w-xs bg-base shadow-neo rounded-2xl p-4;`.
- Convert `.picker-panel` to `@apply bg-base shadow-neo rounded-2xl p-4;`.
- Update `.picker-direction-button` to `@apply text-xl rounded-full h-9 w-9 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:shadow-neo active:shadow-neo-inner transition-all;`.
- Update `.picker-header-label` to `@apply cursor-pointer mx-0.5 select-none text-gray-800 dark:text-gray-100 text-base font-bold hover:text-primary transition-colors;`.
- Update `.date-picker-cell-hoverable` to `@apply hover:shadow-neo rounded-full transition-shadow text-gray-800 dark:text-gray-100;`.
- Update `.date-picker-cell-selected` to `@apply bg-base shadow-neo-inner text-primary font-bold rounded-full;`.
- Update `.month-picker-cell`, `.year-picker-cell` to `@apply text-center py-2 px-3 rounded-xl font-semibold text-gray-700 dark:text-gray-300 transition-all cursor-pointer;`.
- Update `.month-picker-cell-active`, `.year-picker-cell-active` to `@apply bg-base shadow-neo-inner text-primary font-bold;`.

### 2. `src/components/ui/DatePicker/tables/components/Day.tsx`
- Update active/selected day class to use Neumorphic `bg-base shadow-neo-inner text-primary font-bold` instead of `bg-primary text-neutral`.
- Keep in-range days highlighted with `bg-primary-subtle`.
- Ensure today indicator uses `ring-1 ring-inset ring-primary`.

### 3. `src/components/ui/DatePicker/tables/MonthTable.tsx` & `YearTable.tsx`
- Update month/year cell classes:
  - Active: `bg-base shadow-neo-inner text-primary font-bold rounded-xl`
  - Inactive hover: `hover:shadow-neo text-gray-800 dark:text-gray-100 rounded-xl transition-all`
  - Disabled: `opacity-30 cursor-not-allowed shadow-none`

### 4. `src/assets/styles/components/_input.css` & `_input-group.css`
- Update `.input-addon` to `@apply flex items-center px-4 rounded-xl bg-base shadow-neo-inner text-gray-500 dark:text-gray-400 font-semibold border-none;`.
- Ensure `_input-group.css` cleanly connects adjacent inputs, addons, and buttons without border artifacts.

### 5. `src/assets/styles/components/_dropdown.css` & `_card.css`
- In `_dropdown.css`: Update `.dropdown-menu` to `@apply rounded-xl bg-base shadow-neo focus:outline-none p-2 z-30 outline-none;` (removing `bg-white dark:bg-gray-900` and arbitrary shadow).
- In `_card.css`: Update `.card` to `@apply bg-base rounded-2xl;` and `.card-shadow` to `@apply shadow-neo;`.

### 6. `docs/neumorphism-conversion-tracker.md`
- Mark all components as completed:
  - DatePicker
  - Calendar
  - RangeCalendar
  - TimeInput
  - InputGroup
  - ScrollBar
  - StatusIcon
  - toast

### 7. `src/app/design-system/page.tsx`
- Add sections demonstrating:
  - DatePicker (single date, range date, datetime picker)
  - Standalone Calendar
  - TimeInput & TimeInputRange
  - InputGroup (with prefix/suffix addons and buttons)

---

## Verification Plan
1. Run `npm run lint` to ensure no ESLint errors.
2. Build check via Next.js to verify types and imports.
3. Open `http://localhost:3000/design-system` in the browser to visually inspect:
   - DatePicker dropdown and calendar grid: extruded panel, hover states, selected dates (inner shadow).
   - Standalone Calendar.
   - InputGroup with addons.
   - TimeInput.
   - Light and Dark modes via ModeSwitcher.
