# Video-12-Load-Products-By-React-Query

1. npm i @tanstack/react-query @tanstack/react-query-devtools
2. main.tsx

   ```js
   // remove lines
   import axios from 'axios'
   axios.defaults.baseURL =
     process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '/'

     ...
     <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

   ```

3. apiClient.ts

   ```js
   import axios from 'axios'
   const apiClient = axios.create({
     baseURL:
       process.env.NODE_ENV === 'development' ? 'http://localhost:5001' : '/',
     headers: {
       'Content-type': 'application/json',
     },
   })

   export default apiClient
   ```

4. hooks/productHook.ts

   ```js
   export const useGetProductsQuery = () =>
   useQuery({
    queryKey: ['products'],
    queryFn: async () =>
      (
        await apiClient.get<Product[]>(`api/products`)
      ).data,
   })
   ```

5. HomePage.tsx

   ```js
   const { data: products, isLoading, error } = useGetProductsQuery()
   ...
    {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : (
    <Row>
      <Helmet>
        <title>TS Amazona</title>
      </Helmet>
      {products.map((product) => (
        <Col key={product.slug} sm={6} md={4} lg={3}>
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
    )}

   ```
