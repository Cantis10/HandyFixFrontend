Tutorial React SPA
==================

1) Run the project
- Prerequisites: Node.js (>=18), npm, Git.
- Install dependencies: `npm install`
- Start the Vite development server: `npm run dev`
- Build for production: `npm run build`

2) Key directories
- `src/main.jsx`: Vite entry point that wires the `AppProvider` and renders the router.
- `src/App.jsx`: Route definitions, authentication gate, and the shared navigation bar.
- `src/contexts/appContext.jsx`: Mirrors the previous Expo context but uses `localStorage` for persistence and keeps the login/register helpers.
- `src/pages/`: Each file under here is a screen (home, fixes, logs, chat, settings, register, send form).
- `src/components/`: Reusable pieces such as the `FixButtons` grid and `GlobalNav` bar.
- `src/assets/`: Static images for the dashboard, fixes, and chat icons.
- `src/styles/global.css`: Shared layout and utility styles.

3) API / Services
- Authentication and registration still POST to `https://handy-fix-theta.vercel.app/api/login` and `/api/register`.
- Settings polling and POSTs hit the same `test` and `post` endpoints used previously.

4) Testing notes
- Confirm routing: `/register`, `/`, `/fixes`, `/logs`, `/chat`, `/settings`, `/send`.
- Ensure `loginAuth` and `registerAuth` update localStorage and let you enter the guarded routes.
- Uploading images in the send form should create previews via `URL.createObjectURL`.

5) Notes
- This project is now a browser-first Vite SPA. The old Expo files have been removed.
- Assets were moved into `src/assets` so import paths resolve under the new bundler.
- The theme token set in `src/theme.js` keeps the same colors, spacing, and sizes as the native app.
