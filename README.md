# Bottlecap

> **"Your product idea deserves to be made."**

Bottlecap is an AI-powered manufacturing analysis platform. Describe your product idea, and get a complete manufacturing feasibility report in minutes — can it be made, how much will it cost, and where to manufacture it.

---

## Project Docs

| File | Contents | When to read |
|------|----------|-------------|
| `README.md` | Project overview (you are here) | First time |
| `PRODUCT.md` | Product definition, user journey, features | Product decisions |
| `DESIGN.md` | Brand specs, design system, UI components | Before writing frontend |
| `TECH.md` | Tech architecture, database, API design | Before writing backend |
| `PROMPTS.md` | All Claude API prompt templates | When working on AI analysis |
| `BUSINESS.md` | Business model, pricing, fundraising | Business decisions or pitch prep |
| `TASKS.md` | Development task list, progress tracking | Start of each work day |

---

## Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/bottlecap.git
cd bottlecap
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

---

## Product Positioning

**Bottlecap is the first bridge between product ideas and the manufacturing world.**

People with no manufacturing background can learn — for the first time — whether their idea can be made, how much it will cost, and where to find factories. What used to take 3 weeks and a $5,000 sourcing agent, Bottlecap delivers in minutes for $99.

---

## Core Value Proposition

```
User has:      A product idea (text or image)
User lacks:    Manufacturing knowledge, supply chain contacts, sourcing experience
Bottlecap:     A professional report + specific action plan
```

---

## Why "Bottlecap"?

A bottle cap — small, but it seals in all the possibilities. Every great product starts with "what if I could actually make this?"

---

## Current Status

- **Stage:** MVP Build
- **Goal:** First paying customer within 2 weeks
- **Pricing:** Single report $99 | Monthly $199/mo

---

## Working Principles for Claude Code

Before starting any task, read the relevant MD file:

- Writing frontend → Read `DESIGN.md` first
- Writing API or database → Read `TECH.md` first
- Working on AI analysis → Read `PROMPTS.md` first
- Not sure what to do → Read `TASKS.md` first

Development principle: Get it running first, optimize later. Being able to charge money matters more than clean code.
