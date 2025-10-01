# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- This is an Expo + React Native app using Expo Router and TypeScript. It uses file-based routing under the app/ directory and a custom bottom tab layout. Web output is enabled (web.output = "static"). Typed routes and React Compiler are turned on.

Core commands
- Install dependencies
  - npm install
- Start development server (QR/code scan, platform pickers)
  - npm run start
  - Equivalent alias: npm run dev
- Run on specific platforms (requires platform tooling/emulator)
  - Android: npm run android
  - iOS (macOS only): npm run ios
  - Web: npm run web
- Lint
  - npm run lint
- Reset the template to a blank app (interactive)
  - npm run reset-project

Testing
- No test runner or scripts are configured in this repo. There is no single-test command at this time.

Architecture and structure (high level)
- Routing (Expo Router)
  - Root stack defined in app/_layout.tsx. It registers the (tabs) group as the main area and mounts auth/login and auth/register as modal screens. A generic app/modal.tsx exists for modal UX, and app/+not-found.tsx is used for unknown routes.
  - Tabs are implemented as a group under app/(tabs)/ with a custom layout in app/(tabs)/_layout.tsx. Instead of react-navigation’s TabNavigator, the layout renders <Slot /> for the active route and a custom <BottomNav /> component fixed at the bottom.
  - Dynamic route: app/product/[productId].tsx fetches product data via axios and supports “add to cart,” redirecting to login when unauthenticated.
- State and data
  - Authentication: app/context/AuthContext.tsx provides user state with login/logout helpers, persists the user in AsyncStorage, and navigates using expo-router. Login integrates with a local API (axios POST /api/users/login) and stores the returned user.
- UI and theming
  - Theming primitives live in constants/theme.ts (Colors, Fonts). The hooks/use-theme-color.ts helper reads the current scheme and returns the appropriate palette values. The components/ThemedText.tsx and components/ThemedView.tsx wrap RN primitives to apply theme-aware colors.
  - Reusable UI lives under components/ (BottomNav, SearchBar, banners, flash sale, profile section, etc.). Avoid enumerating each component here; browse the folder for specifics.
- Configuration
  - app.json: core Expo app config (name/slug/icons), plugins: ["expo-router", "expo-splash-screen"], web output set to static, android edge-to-edge enabled. Experiments: { typedRoutes: true, reactCompiler: true }.
  - TypeScript: tsconfig.json extends expo/tsconfig.base and defines a path alias @/* -> project root.
  - ESLint: eslint.config.js uses eslint-config-expo/flat with dist/ ignored.

Important notes from README.md
- Getting started: npm install, then npx expo start (npm run start does the same). The reset-project script can move the starter code under app-example/ and generate a fresh app/ skeleton.

Other rule/config files
- No CLAUDE.md, Cursor rules (.cursor/ or .cursorrules), or Copilot instructions (.github/copilot-instructions.md) were found.
