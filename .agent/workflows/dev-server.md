---
description: How to start the development server and clear stale cache
---

## Start / Restart Dev Server

1. Stop any running dev server:
   ```
   pkill -f "next dev" 2>/dev/null
   ```

2. If you renamed or moved any page files, clear the `.next` cache first:
   ```
   rm -rf .next
   ```
   // turbo

3. Start the dev server:
   ```
   ./start.sh
   ```

4. Open `http://localhost:3000` in browser.

## Build for Production

1. Run:
   ```
   npm run build
   ```

2. If build fails with ESLint errors, they are pre-existing. The `next.config.ts` has `ignoreDuringBuilds: true` to bypass them.

## Fresh Install (if deps are broken)

1. Run:
   ```
   npm run fresh-install
   ```
   This deletes `node_modules`, `.next`, and `package-lock.json`, then reinstalls.
