# Animation Recipes

Ready-to-build implementations for the cases that come up constantly. Start from these instead of a blank file — adjust tokens/timing to match the codebase's existing scale before shipping. Every recipe follows `SKILL.md`: `transform`/`opacity` only, no approximated curves, reduced-motion and hover-gating included.

Tokens assumed (define once, reuse everywhere):

```css
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
}
```

---

## Button press

**Purpose:** feedback. **Tool:** CSS transition. **Duration:** 100–160ms.

```css
.button {
  transition: transform 120ms var(--ease-out), background-color 120ms var(--ease-out);
}
.button:active {
  transform: scale(0.97);
}
```

No keyframes — a rapid double-click must retarget mid-transition, not restart.

---

## Dropdown / select menu

**Purpose:** spatial consistency (anchored to trigger). **Tool:** CSS transition + `@starting-style`, or Motion if state is already JS-driven. **Duration:** 150–250ms.

```css
.dropdown {
  transform-origin: var(--transform-origin, top center);
  transition: transform 180ms var(--ease-out), opacity 180ms var(--ease-out);
}
.dropdown[data-state="closed"] {
  transform: scale(0.96) translateY(-4px);
  opacity: 0;
}
.dropdown[data-state="open"] {
  transform: scale(1) translateY(0);
  opacity: 1;
}
```

Set `--transform-origin` inline from the trigger's position — never hardcode `center` on an anchored menu.

---

## Tooltip

**Purpose:** explanation. **Tool:** CSS transition. **Duration:** 125–200ms, with a short open delay (~300ms) so it doesn't fire on every incidental hover.

```css
.tooltip {
  transform: scale(0.94) translateY(2px);
  opacity: 0;
  transition: transform 150ms var(--ease-out), opacity 150ms var(--ease-out);
  transition-delay: 0ms;
}
.tooltip[data-state="visible"] {
  transform: scale(1) translateY(0);
  opacity: 1;
}
```

```css
@media (hover: hover) and (pointer: fine) {
  .trigger:hover ~ .tooltip { --show-delay: 300ms; }
}
```

---

## Modal

**Purpose:** preventing a jarring change (focus moving to a new context). **Tool:** CSS transition or Motion. **Duration:** 200–350ms. **Exempt from `transform-origin` anchoring** — stays centered.

```css
.modal-backdrop {
  transition: opacity 250ms var(--ease-out);
  opacity: 0;
}
.modal-backdrop[data-state="open"] { opacity: 1; }

.modal {
  transform: scale(0.96);
  opacity: 0;
  transition: transform 250ms var(--ease-out), opacity 250ms var(--ease-out);
}
.modal[data-state="open"] {
  transform: scale(1);
  opacity: 1;
}
```

Exit mirrors entry (same curve family, roughly 0.7× the duration — exits can be quicker since the user isn't waiting on new content).

---

## Drawer / sheet

**Purpose:** spatial consistency (content lives off-screen in that direction). **Tool:** CSS transition or Motion. **Duration:** 250–400ms. **Curve:** `--ease-drawer`.

```css
.drawer {
  transform: translateY(100%);
  transition: transform 320ms var(--ease-drawer);
}
.drawer[data-state="open"] {
  transform: translateY(0);
}
```

Use `translateY(100%)` (percentage, not px) so it works regardless of content height. If it's drag-dismissible, see **Drag-to-dismiss** below instead — a plain transition can't carry gesture velocity.

---

## Toast

**Purpose:** feedback. **Tool:** CSS transition (never keyframes — toasts fire repeatedly and must retarget). **Duration:** 200–300ms enter, matched on exit, same axis.

```css
.toast {
  transform: translateY(100%);
  opacity: 0;
  transition: transform 240ms var(--ease-out), opacity 240ms var(--ease-out);
}
.toast[data-state="open"] {
  transform: translateY(0);
  opacity: 1;
}
.toast[data-state="closed"] {
  transform: translateY(100%);
  opacity: 0;
  transition-duration: 180ms; /* exit a touch snappier than entry */
}
```

Entered from the bottom → dismiss through the bottom (or via swipe on the same axis). Never cross-fade a toast that slid in.

---

## Accordion

**Purpose:** state indication. **Tool:** CSS `grid-template-rows` trick (the sanctioned way to fake a `height: auto` transition without measuring) — this is the one place `height`-adjacent animation is tolerated.

```css
.accordion-row {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 300ms var(--ease-in-out);
}
.accordion-row[data-state="open"] {
  grid-template-rows: 1fr;
}
.accordion-row > .accordion-content {
  overflow: hidden;
}
```

No JS height measurement, no layout thrash. Pair the chevron/caret rotation with `transform: rotate()`, same duration.

---

## Stagger (list / grid entrance)

**Purpose:** preventing a jarring change — everything popping in at once reads as a glitch, not a list. **Tool:** CSS `animation-delay` per item, or Motion `staggerChildren`. **Stagger interval:** 30–80ms, capped — don't stagger 40 items linearly or the last one lands a full second late.

```css
.list-item {
  animation: fade-up 400ms var(--ease-out) both;
  animation-delay: calc(var(--i) * 50ms);
}
@keyframes fade-up {
  from { transform: translateY(8px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

```css
/* cap total stagger so long lists don't crawl in */
.list-item:nth-child(n+8) { animation-delay: 400ms; }
```

Set `--i` inline (`style={{ '--i': index }}`) or via `nth-child`. Trigger with an `IntersectionObserver` adding a class, not on mount, if the list is below the fold.

---

## Hold-to-confirm

**Purpose:** feedback with intentional friction (prevents accidental destructive actions). **Tool:** CSS animation for the fill, driven by a held pointer state. **Asymmetric timing:** slow linear hold, snappy release.

```css
.confirm-fill {
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 2000ms linear;
}
.confirm-btn:active .confirm-fill {
  transform: scaleX(1);
}
.confirm-btn:not(:active) .confirm-fill {
  transition: transform 200ms var(--ease-out); /* snap back fast on release */
}
```

The 2s hold is the deliberate phase — linear, so progress reads honestly. The release/reset is a system response — fast `ease-out`.

---

## Tab indicator

**Purpose:** spatial consistency (showing which tab is active and where the previous one was). **Tool:** CSS transition on `transform`, measured via `offsetLeft`/`offsetWidth` of the active tab; or Motion `layoutId` if already using Motion.

```css
.tab-indicator {
  position: absolute;
  transition: transform 250ms var(--ease-in-out), width 250ms var(--ease-in-out);
  transform: translateX(var(--tab-x));
  width: var(--tab-w);
}
```

`width` here is the one non-transform property worth the exception — a tab indicator that only translates looks wrong when tab widths differ. If tabs are equal width, drop `width` entirely and it's a pure transform animation.

---

## Scroll reveal

**Purpose:** preventing a jarring change as content enters the viewport. **Tool:** `IntersectionObserver` toggling a data-attribute + CSS transition (not a scroll-linked JS loop — that runs every frame for no reason).

```css
[data-reveal="hidden"] {
  opacity: 0;
  transform: translateY(24px);
}
[data-reveal="visible"] {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 700ms var(--ease-out), transform 700ms var(--ease-out);
}
```

Observe once, disconnect after the element reveals — this shouldn't re-trigger on scroll-back. Default content to visible (no `data-reveal` attribute) until JS confirms the hidden state, so a slow script never leaves content invisible.

---

## Drag-to-dismiss

**Purpose:** delight / gesture. **Tool:** Motion — this is the case a spring exists for. Needs velocity carried through interruption, which CSS transitions cannot do.

```jsx
<motion.div
  drag="y"
  dragConstraints={{ top: 0, bottom: 0 }}
  dragElastic={0.5}
  onDragEnd={(_, info) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      controls.start({
        transform: "translateY(100%)",
        transition: { type: "spring", stiffness: 300, damping: 30 },
      });
    } else {
      controls.start({
        transform: "translateY(0px)",
        transition: { type: "spring", duration: 0.5, bounce: 0.2 },
      });
    }
  }}
/>
```

Check both distance and velocity — a fast short flick should dismiss even if it didn't cross the distance threshold. Snap-back uses the same spring family as the dismiss, just a different target, so an interrupted gesture never feels like it switched physics mid-flight.

---

## Reduced motion, once, for all of the above

```css
@media (prefers-reduced-motion: reduce) {
  .button, .dropdown, .tooltip, .modal, .drawer, .toast,
  .accordion-row, .list-item, .tab-indicator, [data-reveal] {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Keep the opacity/color transitions if they aid comprehension (a toast still needs to visually appear); it's the movement that gets stripped, not the whole animation.
