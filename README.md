# @somenergia/frontend-config

Shared frontend tooling configuration for Somenergia projects.
Covers ESLint, Prettier and Vite so all projects stay consistent without duplicating setup files.

## Installation

This package is not published to npm. Install it directly from the GitHub repository:

```bash
npm install --save-dev github:Som-Energia/frontend-configuration eslint prettier
```

Or pin a specific tag or commit:

```bash
npm install --save-dev "github:Som-Energia/frontend-configuration#v1.0.0"
```

If you also use the Vite helper, add `vite` to your dev dependencies:

```bash
npm install --save-dev vite
```

---

## ESLint

Based on ESLint 9 flat config. Includes React, React Hooks, React Refresh, Prettier integration, sorted imports, and unused-import detection out of the box.

Create `eslint.config.js` in the project root:

```js
import baseConfig from "@somenergia/frontend-config/eslint";

export default [
  ...baseConfig,
  // project-specific overrides (optional)
];
```

### Adding project-specific plugins

Extra plugins (Storybook, Cypress, Jest/Vitest…) are not bundled — add them as needed:

```js
import baseConfig from "@somenergia/frontend-config/eslint";
import storybook from "eslint-plugin-storybook";

export default [...baseConfig, ...storybook.configs["flat/recommended"]];
```

### Adding test globals (Vitest / Jest)

```js
import baseConfig from "@somenergia/frontend-config/eslint";
import globals from "globals";

export default [
  ...baseConfig,
  {
    files: ["**/*.test.{js,jsx}", "src/tests/**"],
    languageOptions: {
      globals: globals.jest, // or globals.vitest once available
    },
  },
];
```

---

## Prettier

### Option A — reference from `package.json`

```json
{
  "prettier": "@somenergia/frontend-config/prettier"
}
```

### Option B — `prettier.config.js`

```js
export { default } from "@somenergia/frontend-config/prettier";
```

### Overriding individual options

```js
import base from "@somenergia/frontend-config/prettier";

export default {
  ...base,
  printWidth: 100,
};
```

### `.prettierignore`

Create a `.prettierignore` in the project root with whatever is relevant:

```
.env*
node_modules/
dist/
build/
coverage/
```

---

## Vite

### `createAppConfig(factory)`

Creates a base Vite + Vitest configuration for SPA projects.

```js
// vite.config.mjs
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { createAppConfig } from "@somenergia/frontend-config/vite";

export default createAppConfig(({ mode }) => ({
  plugins: [react(), svgr()],
}));
```

The `factory` argument is merged on top of the base config. Base defaults:

| Option               | Default                                |
| -------------------- | -------------------------------------- |
| `build.outDir`       | `'build'`                              |
| `build.manifest`     | `'asset-manifest.json'`                |
| `build.sourcemap`    | `true`                                 |
| `build.target`       | `'es2020'`                             |
| `build.cssCodeSplit` | `false`                                |
| `server.port`        | `3000`                                 |
| `server.open`        | `true`                                 |
| `test.globals`       | `true`                                 |
| `test.environment`   | `'jsdom'`                              |
| `test.css`           | `true`                                 |
| `base`               | read from `BASE_URL` in `.env.*` files |

### `createManualChunks(extraChunks?)`

Returns a Rollup `manualChunks` function that splits `node_modules` into named vendor chunks.
Default groups: `vendor-mui`, `vendor-react`, `vendor-charts`, `vendor-i18n`, `vendor-somenergia`, `vendor` (fallback).

Add project-specific groups before the defaults:

```js
import {
  createAppConfig,
  createManualChunks,
} from "@somenergia/frontend-config/vite";
import react from "@vitejs/plugin-react-swc";

export default createAppConfig(() => ({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: createManualChunks([
          { chunk: "vendor-formik", includes: ["formik", "/yup/"] },
          { chunk: "vendor-lodash", includes: ["/lodash"] },
        ]),
      },
    },
  },
}));
```

### `defaultVendorChunks`

The raw array of default chunk definitions. Import it if you need to inspect or replace them entirely.

---

## What each file does

| File          | Purpose                                                        |
| ------------- | -------------------------------------------------------------- |
| `eslint.js`   | ESLint 9 flat config base                                      |
| `prettier.js` | Explicit Prettier settings                                     |
| `vite.js`     | `createAppConfig`, `createManualChunks`, `defaultVendorChunks` |
