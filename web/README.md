# web

The Vue app for [ioannissavvaidis.com](https://ioannissavvaidis.com). Development,
deployment and layout are in the [root README](../README.md); the root `Makefile` wraps
the npm scripts in `package.json`.

```shell
npm ci
npm run dev           # Vite dev server
npm run test:unit     # Vitest
npm run test:e2e      # build, serve with vite preview, run Cypress
npm run lint:ci       # ESLint and Prettier, as CI runs them
```
