# Video-13-Create-Product-Page

1. index.ts

   ```js
   app.get('/api/products/:slug', (req: Request, res: Response) => {
     res.json(sampleProducts.find((x) => x.slug === req.params.slug))
   })
   ```

2. productHooks.ts

   ```js
   export const useGetProductDetailsBySlugQuery = (slug: string) =>
     useQuery({
       queryKey: ['products', slug],
       queryFn: async () =>
         ((await apiClient.get) < Product > `api/products/slug/${slug}`).data,
     })
   ```

3. ProductPage.tsx

   ```js

      function ProductPage() {
           const params = useParams()
        const { slug } = params

        const {
          data: product,
          refetch,
          isLoading,
          error,
        } = useGetProductDetailsBySlugQuery(slug!)

        return isLoading ? (
          <LoadingBox />
        ) : error   ? (
          <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
        ) : !product ? (
          <MessageBox variant="danger">Product Not Found</MessageBox>
        ): (
          <div>
            <Row>
              <Col md={6}>
                <img
                  className="large"
                  src={product.image}
                  alt={product.name}
                ></img>
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Helmet>
                      <title>{product.name}</title>
                    </Helmet>
                    <h1>{product.name}</h1>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                    ></Rating>
                  </ListGroup.Item>
                  <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Description:
                    <p>{product.description}</p>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>${product.price}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            {product.countInStock > 0 ? (
                              <Badge bg="success">In Stock</Badge>
                            ) : (
                              <Badge bg="danger">Unavailable</Badge>
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <div className="d-grid">
                            <Button variant="primary">
                              Add to Cart
                            </Button>
                          </div>
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            </div>
          </div>
        )
      }
      export default ProductPage

   ```
