# Travel Simba — Chase Elegance, Reserve Your Dream Stay

A pixel-perfect, responsive homepage for Travel Simba, a hospitality booking platform, built as part of the Full Stack Developer Intern assignment.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js + TypeScript + Tailwind CSS |
| CMS | React + Vite + Ant Design |
| Backend / Database | Supabase |
| AI Agent | Anthropic Claude API |

## Features

- Pixel-perfect recreation of the Figma homepage design
- Fully responsive across mobile (~375px), tablet (~768px), and desktop (~1440px)
- Sections: Hero banner, Travel Simba Exclusives, Discover Your Favorite Stay, Explore Popular Destinations, promo banners, Experiences, Trusted By Many (testimonials), Latest Insights & Updates, footer
- **CMS Dashboard** — a separate admin panel for managing site content (deals, destinations, promos, testimonials, insights), backed by Supabase
- **AI Support Agent (bonus)** — a chat widget that answers visitor questions using site content as context

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/tanushree1915/travel-website-next.js.git
cd travel-website-next.js
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local` and add your keys:

```
ANTHROPIC_API_KEY=your-key-here
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-key
```

Get an Anthropic key at [console.anthropic.com](https://console.anthropic.com), and Supabase credentials from your [Supabase project dashboard](https://supabase.com/dashboard).

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## CMS

The `cms/` folder contains a separate admin panel (React + Vite + Ant Design) used to manage site content stored in Supabase — deals, destinations, promo banners, testimonials, and insights. Changes made in the CMS are reflected on the live site.

### Running the CMS locally

```bash
cd cms
npm install
npm run dev
```

## AI Support Agent (Bonus)

The chat widget (bottom-right corner, on every page) answers visitor questions using a simple RAG-style approach:

- All site content (deals, destinations, promos, testimonials, insights) lives in `data/knowledge-base.json`
- On each user message, the full knowledge base is passed as context to Claude via `app/api/chat/route.ts`
- Claude is instructed to answer only from that context

**What it can answer:** questions about current deals, destinations, testimonials, and blog insights present in the knowledge base.

**What it can't answer:** anything outside that scope — e.g. live booking availability or payments — it will say it doesn't have that information.

**Note:** The knowledge base is currently a static JSON file since the project doesn't have a live database yet. If a backend (Firebase/Supabase) is added later, the `import knowledgeBase from "@/data/knowledge-base.json"` line in `app/api/chat/route.ts` can be swapped for a live database fetch — the rest of the flow stays identical.

## Project Structure

```
app/
├── api/
│   └── chat/
│       └── route.ts        # AI agent backend endpoint
├── layout.tsx
└── page.tsx
components/                 # UI sections and reusable components
data/
└── knowledge-base.json     # AI agent's knowledge source
cms/                        # Admin panel for managing site content (Supabase-backed)
```

## Deployment

- Live site: https://travel-website-next-js-eta.vercel.app/
- CMS dashboard: https://travel-website-next-js-lvs6.vercel.app/