# Video-34-Run-Backend-And-Frontend-Concurrently

1. npm install --save-dev concurrently
2. package.json

   ```js
    "dev": "concurrently \"npm run dev --prefix backend\" \"npm run dev --prefix frontend\"",
   ```

3. npm run dev
