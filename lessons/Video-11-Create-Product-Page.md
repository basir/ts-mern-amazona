# Video-11-Set-Page-Title

1. npm i react-helmet-async
2. main.tsx

   ```js
   import { HelmetProvider } from 'react-helmet-async'

   ...
   <HelmetProvider>
     <RouterProvider router={router} />
   </HelmetProvider>
   ```

3. HomePage.tsx

   ```js
   import { Helmet } from 'react-helmet-async'
   ...
   <Helmet>
        <title>Amazona</title>
   </Helmet>
   ```
