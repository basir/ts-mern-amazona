# Video-31-Publish-Website-On-Render

1. index.ts

   ```js

   import path from 'path'
   ...
   app.use(express.static(path.join(__dirname, '../../frontend/dist')))
   app.get('*', (req: Request, res: Response) =>
     res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
   )

    const PORT: number = parseInt((process.env.PORT || '4000') as string, 10)

   ```

2. npm init
3. package.json

   ```json
      "scripts": {
          "build": "cd backend && npm --force install  && npm run build  && cd ../frontend && npm install && npm run build",
          "start": "TG_ALLOW_MIXED=ALLOW  node backend/build/index.js",
          "test": "echo \"Error: no test specified\" && exit 1"
        },
   ```

4. npm run build
5. Open http://localhost:4000
