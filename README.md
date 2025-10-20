# zhyn-v2-frontend

A Vue.js 3 application built with Vite.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- Vue 3 with `<script setup>` SFCs
- Vite for fast development and optimized builds

## API Integration

This frontend calls a backend API. By default, API requests are sent to `/api` and Vite is configured to proxy them during development to `http://localhost:8000`.

- Dev proxy: see `vite.config.js` (the `/api` path is proxied to `http://localhost:8000`).
- Runtime base URL: can be overridden via env var `VITE_API_BASE_URL`.

Example `.env.local` (optional):

```
VITE_API_BASE_URL=http://localhost:8000/api
```

### Available client functions

Located under `src/api/`:

- `zhuyinDictionary.js`: `register`, `unregister`, `getAnswer`, `lookupZhuyin`
- `quiz.js`: `makeQuiz`, `endQuiz`, `registerQuestion`, `startQuestion`, `submitAnswer`
- `levelMap.js`: `createLevel`, `addCharacter`, `removeCharacter`, `generateSentences`

Each function performs a JSON POST matching the API spec. Errors from `{ error: string }` responses are thrown as `Error` with the message.

### Manual testing

Open the app and use the “API Playground” section rendered by `src/components/ApiPlayground.vue`. It provides simple forms to call each endpoint and shows the raw JSON response or error.
