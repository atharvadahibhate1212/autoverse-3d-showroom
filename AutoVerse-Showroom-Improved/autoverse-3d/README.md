# AutoVerse 3D — Frontend-only automotive marketplace

A cinematic React frontend demo featuring a black-and-gold automotive showroom, dual-currency vehicle pricing (INR ₹ and approximate USD US$), filters, comparison, favorites, photo color previews, and a local demo admin console. Catalogue prices are illustrative demo estimates, not official manufacturer quotations.

## Requirements
- Node.js 20 or newer recommended
- VS Code (or another editor)
- Internet connection for the first install and Google Fonts / Three.js environment assets

## Run locally
1. Extract the ZIP folder.
2. Open the extracted `autoverse-3d` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL printed by Vite, usually `http://localhost:5173`.

If PowerShell blocks npm scripts, try `npm.cmd install` and `npm.cmd run dev`.

## Features
- Responsive cinematic homepage and navigation
- React + Three.js interactive showroom; drag to rotate and scroll to zoom
- Procedurally built demo car, SUV and motorcycle models (no missing model files)
- Camera presets and paint color controls
- Vehicle search, brand/type/price filters and sorting (prices displayed in both INR ₹ and approximate USD using Indian digit grouping for INR)
- Compare up to three vehicles
- Browser-local favorites
- Frontend admin demo: create, edit, and delete catalogue records
- `localStorage` persistence for catalogue and favorites
- GSAP hero entrance animation

## Important limitations
This is a frontend-only portfolio project. Vehicle prices are illustrative INR demo values, not verified market prices. Catalogue changes and favorites are stored only in the current browser using `localStorage`; they do not sync between users or devices. The admin screen is a demo and is not protected by server-side authentication. Test-drive requests, payments, and shared accounts are not implemented. The 3D vehicles are original stylized models built from Three.js primitives, not manufacturer-supplied CAD models.

## Build for production
```bash
npm run build
npm run preview
```

## Main files
- `src/App.jsx` — pages, interactions, data and 3D model components
- `src/styles.css` — responsive black-and-gold theme
- `src/main.jsx` — React entry point
- `index.html` — page metadata


Prices show both ₹ INR and US$ USD side by side. There is no currency-removal behavior; the USD equivalent is calculated from the INR price using an indicative fixed demo rate of ₹88 per US$1.