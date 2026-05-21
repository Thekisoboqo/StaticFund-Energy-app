1. **Move Dependencies**: Move `@capacitor/cli` and `@capacitor/android` to `devDependencies` in `package.json` to reduce bundle size.
2. **Optimize Build**: Add manual chunks configuration in `vite.config.js` as requested.
3. **Fix CSS & Theming**:
   - Update `index.css` to use the "Privacy Filter Agent" dark theme (`#111C1A` background, `#0CD3AD` accent, etc.).
   - Ensure the layout constraints meet the memory instructions (`.container` height `100vh`, `overflow: hidden`; `.content` `padding-bottom: 90px`, `nav-bar` `position: absolute`).
4. **App State & Storage**:
   - Update `App.jsx` to initialize `devices` and `activeScreen` from `localStorage` using lazy initialization.
   - Watch state changes and save to `localStorage`.
5. **Implement Settings Screen**: Create `src/screens/Settings.jsx` to manage mock features like `electricityRate`, `notificationSettings`, `inverterConfigs`, and `agentMemory` in `localStorage`. Update `App.jsx` to render it.
6. **Refactor Hardcoded UI colors**: Go through `Inventory.jsx`, `Audit.jsx`, `Insights.jsx` and replace hardcoded hex colors (e.g., `#FEF3C7`, `#0369A1`, `#FCD34D`) with CSS variables mapped to the new dark theme.
7. **Pre-commit Checks**: Run tests/linters before completion.
8. **Submit Changes**.
