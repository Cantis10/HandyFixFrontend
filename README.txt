Project README — How to run & essential component reference

1) Run the project (quick start)
- Prerequisites: Node.js (>=14), npm or yarn, Git.
- Install dependencies: `npm install` (or `yarn`)
- Start Metro / Expo: `npx expo start`

2) Typical workflow on Windows
- Open a terminal in the project root (where `package.json` is).
- Run `npm install` once after cloning.
- Run `npx expo start` to launch the Metro bundler and Expo devtools.
- Use the Expo Go app (Android/iOS) or an Android emulator.

3) Important files & entry points
- `App.js` / `index.js`: the app entry files that register the root component.
- `app.json`: Expo config.
- `package.json`: scripts and dependencies.
- `Root.js`: likely contains app-level setup (navigation, providers).

4) Project structure (high level)
- app/: app-specific assets and screens
- assets/: static assets (images, icons)
- components/: reusable components and major screens
  - `components/App.js` — main app container / root UI (check file to confirm exact role)
  - `components/fixButtons.js` — UI for fix-related buttons
  - `components/home.js` — Home screen component
  - `components/loadScreen.js` — App loading / splash UI
  - `components/SAMPLE!!!.js` — sample/test component (non-production)
  - `components/settings.js` — Settings screen component
  - `components/chats/chatDetails.js` — Chat details view
  - `components/chats/chatLists.js` — Chat list view
  - `components/fixes/fixesSubType.js` — fix sub-type screen/component
  - `components/fixes/fixesType.js` — fix type screen/component
  - `components/fixes/send.js` — screen/component to send fixes
  - `components/logs/logs.js` — logs viewer component
  - `components/Signing/login.js` — login screen
  - `components/Signing/RegisterComponent.js` — registration component
  - `components/Signing/signIn.js` — alternate sign-in handling
- contexts/: React context providers
  - `contexts/appContext.js` — app-level context (global state, helpers)

5) Component & context notes (what to look for)
- Screens vs UI components: files named like `home.js`, `login.js`, `send.js` are screens. Files like `fixButtons.js` are smaller UI components used by screens.
- Check each file for exported React components (usually `export default`) and any connected navigation or context usage.
- `contexts/appContext.js` likely exports a provider and hook — search for `AppContext`, `AppProvider`, or `useAppContext`.

6) Common commands
- `npm start` — may forward to `expo start` if defined in `package.json`.
- `npx expo start` — start Metro and Expo devtools.
- `npx expo start -c` — clear Metro cache (fix many bundler issues).
- `npm run android` / `npm run ios` — if defined in `package.json` to run on specific platforms.

7) Troubleshooting
- Metro bundler errors: stop Metro, run `npx expo start -c`.
- Native build failures: ensure correct Android SDK / emulator config, or use Expo Go for JS-only flow.
- Missing module errors: run `npm install` and double-check the `import` paths.
- If components fail to render, open the component file and confirm default export and proper `react` import.

8) Notes for contributors
- Keep components modular: screens under `components/` subfolders, small UI widgets at top-level `components/`.
- Use `contexts/appContext.js` for global state rather than prop-drilling.
- Add small README updates when adding new screens or major changes to navigation.

9) Next steps / suggestions
- I can generate a more detailed component map by reading each component file and extracting short descriptions and exports.
- I can also add `README.md` style formatting (Markdown) or create a DOCX if you prefer.

-- End of README --
