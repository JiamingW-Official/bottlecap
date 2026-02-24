# 🎨 DESIGN.md — Design System Documentation

> Claude Code must read this file before writing any frontend code.
> All colors, fonts, spacing, and component styles are defined here.

---

## 🎨 Brand Core

### Brand Feel
**Not:** Cold SaaS tool, overly techy, corporate
**Is:** Warm, confident, like a knowledgeable friend who understands manufacturing

Reference feel: Notion's simplicity + Linear's polish + a touch of Duolingo's warmth

### Brand Keywords
Possibility, warmth, professional but not arrogant, concrete, action-oriented

---

## 🎨 Color System

```css
/* Primary — warm orange, conveys possibility and action */
--color-primary:     #FF6B35;
--color-primary-hover: #E85A25;
--color-primary-light: #FFF0EB;

/* Background — warm off-white, easy on the eyes */
--color-background:  #FAFAF8;
--color-surface:     #FFFFFF;
--color-surface-2:   #F5F5F0;

/* Text */
--color-foreground:  #1A1A1A;
--color-muted:       #6B6B6B;
--color-subtle:      #9B9B9B;

/* Borders */
--color-border:      #E8E8E4;
--color-border-strong: #D0D0C8;

/* Status colors */
--color-success:     #22C55E;
--color-warning:     #F59E0B;
--color-danger:      #EF4444;
--color-info:        #3B82F6;

/* Feasibility score colors */
--score-high:        #22C55E;   /* 80-100 Highly Feasible */
--score-medium:      #F59E0B;   /* 50-79  Feasible / Needs Adjustment */
--score-low:         #EF4444;   /* 0-49   Challenging */
```

**Tailwind config (tailwind.config.ts):**
```typescript
colors: {
  primary: {
    DEFAULT: '#FF6B35',
    hover: '#E85A25',
    light: '#FFF0EB',
  },
  background: '#FAFAF8',
  surface: {
    DEFAULT: '#FFFFFF',
    2: '#F5F5F0',
  },
  foreground: '#1A1A1A',
  muted: '#6B6B6B',
  border: {
    DEFAULT: '#E8E8E4',
    strong: '#D0D0C8',
  }
}
```

---

## 📝 Typography System

```css
/* Font family */
--font-sans: 'Inter', -apple-system, sans-serif;

/* Font sizes */
--text-xs:   12px;
--text-sm:   14px;
--text-base: 16px;
--text-lg:   18px;
--text-xl:   20px;
--text-2xl:  24px;
--text-3xl:  30px;
--text-4xl:  36px;
--text-5xl:  48px;
--text-6xl:  60px;
--text-7xl:  72px;

/* Font weights */
--font-normal:   400;
--font-medium:   500;
--font-semibold: 600;
--font-bold:     700;
--font-black:    900;
```

**Typography rules:**
- Hero heading: `text-6xl font-black tracking-tight leading-none`
- Page title (H1): `text-4xl font-bold`
- Section title (H2): `text-2xl font-semibold`
- Body text: `text-base font-normal text-muted`
- Button: `text-base font-semibold`
- Data label: `text-sm font-medium text-muted`
- Large number (score): `text-7xl font-black`

---

## 📐 Spacing & Layout

```css
/* Page max widths */
--max-width-content: 1200px;
--max-width-narrow:  800px;
--max-width-form:    640px;

/* Page padding */
--page-padding-x:    24px;  /* Mobile */
--page-padding-x-md: 48px;  /* Desktop */

/* Section spacing */
--section-gap:       80px;  /* Desktop section gap */
--section-gap-sm:    48px;  /* Mobile */

/* Border radius */
--radius-sm:   6px;
--radius-md:   12px;
--radius-lg:   16px;
--radius-xl:   24px;
--radius-full: 9999px;
```

---

## 🧩 Core Component Specs

### Primary Button (CTA Button)
```tsx
// Primary action button — orange large button
<button className="
  bg-[#FF6B35] hover:bg-[#E85A25]
  text-white font-semibold
  px-8 py-4 rounded-full
  text-base
  transition-all duration-200
  hover:scale-[1.02] active:scale-[0.98]
  shadow-[0_4px_20px_rgba(255,107,53,0.3)]
  hover:shadow-[0_6px_30px_rgba(255,107,53,0.4)]
">
  Analyze this idea →
</button>

// Secondary button — gray outline
<button className="
  border border-[#E8E8E4]
  bg-white hover:bg-[#F5F5F0]
  text-[#1A1A1A] font-medium
  px-6 py-3 rounded-full
  text-base transition-all duration-200
">
  See an example
</button>
```

### Card
```tsx
// Standard content card
<div className="
  bg-white rounded-2xl
  border border-[#E8E8E4]
  p-6 shadow-[0_2px_16px_rgba(0,0,0,0.06)]
  hover:shadow-[0_4px_24px_rgba(0,0,0,0.10)]
  transition-shadow duration-200
">
```

### Report Card — The sharing vehicle, most important
```tsx
// This card will be screenshotted and shared; every detail matters
<div className="
  bg-white rounded-3xl
  border border-[#E8E8E4]
  p-8
  shadow-[0_8px_40px_rgba(0,0,0,0.12)]
  w-[480px] max-w-full
">
  {/* Top: logo + date */}
  {/* Product name + score (large number + circular progress ring) */}
  {/* One-line summary (orange text) */}
  {/* Four-cell data grid */}
  {/* Bottom: encouragement message + share buttons */}
</div>
```

### Input
```tsx
// Hero large input
<textarea className="
  w-full bg-white
  border-2 border-[#E8E8E4]
  focus:border-[#FF6B35] focus:ring-0
  rounded-2xl p-5
  text-base text-[#1A1A1A]
  placeholder:text-[#9B9B9B]
  resize-none outline-none
  transition-colors duration-200
  shadow-[0_2px_16px_rgba(0,0,0,0.06)]
" />
```

### Progress Step Bar (Form Steps)
```tsx
// Form step indicator
<div className="flex items-center gap-2">
  {[1,2,3].map(step => (
    <div key={step} className={`
      h-1.5 rounded-full transition-all duration-300
      ${step <= currentStep
        ? 'bg-[#FF6B35] w-16'
        : 'bg-[#E8E8E4] w-8'}
    `} />
  ))}
</div>
```

### Choice Card
```tsx
// Large card selection item in forms
<button onClick={() => select(option)} className={`
  w-full p-4 rounded-xl border-2 text-left
  transition-all duration-200
  ${selected === option
    ? 'border-[#FF6B35] bg-[#FFF0EB]'
    : 'border-[#E8E8E4] bg-white hover:border-[#D0D0C8]'}
`}>
```

### Stats Counter
```tsx
// Animated number using Framer Motion count animation
<div className="flex flex-col items-center">
  <span className="text-4xl font-black text-[#1A1A1A]">
    {animatedValue.toLocaleString()}
  </span>
  <span className="text-sm text-[#6B6B6B] mt-1">{label}</span>
</div>
```

---

## 🎬 Animation Specs

```typescript
// Standard fade-in-up (page element entrance animation)
const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
}

// Stagger animation (list items appearing one by one)
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } }
}

// Card hover bounce
const cardHover = {
  whileHover: { y: -4, transition: { duration: 0.2 } }
}

// Button tap feedback
const buttonTap = {
  whileTap: { scale: 0.97 }
}

// Number count animation (useMotionValue + useTransform)
// See utility functions in TECH.md
```

**Animation principles:**
- All animations 200-500ms, never longer
- Use ease-out or custom cubic-bezier
- No animation for animation's sake; every animation must be meaningful
- Reduce animations on mobile

---

## 📱 Responsive Breakpoints

```
Mobile:   < 768px   (default, mobile-first)
Tablet:   768-1024px
Desktop:  > 1024px
Wide:     > 1280px
```

**Responsive principles:**
- Mobile: single column, large text, large buttons, easy to tap
- Desktop: max width 1200px, centered, higher information density
- Report card: full width on mobile, fixed 480px on desktop

---

## 🖼️ Icon Specs

Use `lucide-react` for a consistent style.

```tsx
import {
  ArrowRight,      // CTA arrow
  CheckCircle,     // Success / check
  AlertCircle,     // Warning
  Globe,           // Sourcing / country
  Package,         // Product / inventory
  DollarSign,      // Cost / price
  Clock,           // Lead time / time
  Share2,          // Share
  Download,        // Download
  Zap,             // Fast / AI
  Factory,         // Manufacturing / factory
} from 'lucide-react'

// Standard icon sizes
<Icon size={16} />   // Small (inline)
<Icon size={20} />   // Medium (card)
<Icon size={24} />   // Large (button / beside heading)
```

---

## 📊 Report Card Visual Spec (Important)

The report card is Bottlecap's most important design asset because users will screenshot and share it on Twitter.

**Card dimensions:** 480px x 600px (fixed, for PNG export)

**Visual hierarchy (top to bottom):**

```
┌─────────────────────────────────────────┐
│ 🎯 Bottlecap          2024/01/15        │  ← logo + date, small gray text
├─────────────────────────────────────────┤
│                                         │
│  Smart Thermos                          │  ← product name, large black text
│                                         │
│         ◯  87                           │  ← circular progress ring, orange
│         /100                            │    large number centered
│                                         │
│  This idea is totally feasible —        │  ← one-line summary, orange text
│  Vietnam is your best bet ✨            │
│                                         │
├──────────────┬──────────────────────────┤
│  💰 Cost/unit │  🌍 Sourcing             │
│  $6.2 - $8.4 │  Vietnam 🇻🇳            │
├──────────────┼──────────────────────────┤
│  📦 Min. Order│  ⚡ Lead Time            │
│  500 units   │  32 days                 │
└──────────────┴──────────────────────────┘
│                                         │
│  "The hardest part is the first step    │  ← encouragement, small gray text
│   from idea to factory — and you        │
│   just took it."                        │
│                                         │
│  [Download] [Share on Twitter]          │  ← action buttons
│  [Share on LinkedIn]                    │
└─────────────────────────────────────────┘
```

**When exporting PNG:**
- Use the `html-to-image` library
- Hide action buttons, export card content only
- Resolution: 2x (960px x 1200px)
