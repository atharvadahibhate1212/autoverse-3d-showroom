# AutoVerse Showroom — Improved Frontend

A React + Vite automotive showroom with a premium black-and-gold visual theme.

## Run locally

1. Extract this ZIP.
2. Open the `autoverse-3d` folder in VS Code or a terminal.
3. Install dependencies:
   ```bash
   npm install
   ```
   On Windows PowerShell, if `npm` is blocked by execution policy, use:
   ```powershell
   npm.cmd install
   ```
4. Start the development server:
   ```powershell
   npm.cmd run dev
   ```
5. Open the local URL printed in the terminal (usually `http://localhost:5173`).

## Vercel

Set the project **Root Directory** to `dep_autoverse/autoverse-3d` if deploying from the original repository layout. Build command: `npm run build`. Output directory: `dist`.

## What's improved

- Hero area now uses automotive photography instead of a line icon.
- The showroom's HERO / FRONT / SIDE controls switch between distinct reference photos.
- Vehicle gallery cards retain consistent image framing and existing search/filter/favorites/compare flows.
- Color selection is clearly presented as a photo tint preview, not a physically accurate paint configurator.
- Mobile layouts and photo-view controls have additional responsive styling.
- Labels no longer claim a real 360-degree model rotation.

## Important notes

- This is a frontend demo. Vehicle names/specifications are illustrative, and view buttons switch reference photos for the vehicle category; they do not rotate a single 3D model.
- Images are loaded from external image hosts, so image availability depends on those hosts and an internet connection.
- Favorites and demo catalogue changes are stored in the current browser's local storage.
