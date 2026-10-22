# Seek Now landing page (Vite + React, JavaScript)

    npm install
    npm run dev       # http://localhost:5173
    npm run build     # output in dist/
    npm run preview

## Structure
- `src/components/*.jsx` – one component per section (Header, Hero, Story, Why, Ecosystem, Roles, Capabilities, Trust, Faq, Pricing, Finale, Footer) plus the three product windows
- `src/scripts/*.js` – each section's interaction logic, exported as `init()` and run once on mount via `src/hooks/useInit.js`
- `src/styles/*.css` – the original CSS, split per section (`spotlight.css` is the new torch effect)
- `src/assets/seek-now-logo.png` – the logo (header, footer and the "One Seek Now" hub)

## Things you will likely tweak
- Hero copy: `src/components/Hero.jsx` (and `badge` in `src/scripts/hero-story.js`)
- Spotlight size: `radius` prop on `<Spotlight>` in `Hero.jsx` (default 190)
- Spotlight darkness: `.spot-dim` in `src/styles/spotlight.css`
- Real routes: `CONFIG.routes` in `src/scripts/hero-story.js`
