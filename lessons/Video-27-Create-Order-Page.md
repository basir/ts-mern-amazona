# Video-27-Create-Order-Page

1. orderRouter.ts

   ```js
   orderRouter.get(
     '/:id',
     isAuth,
     asyncHandler(async (req: Request, res: Response) => {
       const order = await OrderModel.findById(req.params.id)
       if (order) {
         res.send(order)
       } else {
         res.status(404).send({ message: 'Order Not Found' })
       }
     })
   )
   ```

2. orderHooks.tsx

   ```js
   export const useGetOrderDetailsQuery = (id: string) =>
     useQuery({
       queryKey: ['orders', id],
       queryFn: async () =>
         ((await apiClient.get) < Order > `api/orders/${id}`).data,
     })
   ```

3. OrderPage.ts

   ```js
        export default function OrderPage() {
          const { state } = useContext(Store)
          const { userInfo } = state

          const params = useParams()
          const { id: orderId } = params

          const {
            data: order,
            isLoading,
            error,
            refetch,
          } = useGetOrderDetailsQuery(orderId!)

          return isLoading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
          ) : !order ? (
            <MessageBox variant="danger">Order Not Found</MessageBox>
          ) : (
            <div>
              <Helmet>
                <title>Order {orderId}</title>
              </Helmet>
              <h1 className="my-3">Order {orderId}</h1>
              <Row>
                <Col md={8}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Shipping</Card.Title>
                      <Card.Text>
                        <strong>Name:</strong> {order!.shippingAddress.fullName} <br />
                        <strong>Address: </strong> {order.shippingAddress.address},
                        {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                        ,{order.shippingAddress.country}
                        &nbsp;
                        {order.shippingAddress.location &&
                          order.shippingAddress.location.lat && (
                            <a
                              target="_new"
                              href={`https://maps.google.com?q=${order.shippingAddress.location.lat},${order.shippingAddress.location.lng}`}
                            >
                              Show On Map
                            </a>
                          )}
                      </Card.Text>
                      {order.isDelivered ? (
                        <MessageBox variant="success">
                          Delivered at {order.deliveredAt}
                        </MessageBox>
                      ) : (
                        <MessageBox variant="warning">Not Delivered</MessageBox>
                      )}
                    </Card.Body>
                  </Card>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Payment</Card.Title>
                      <Card.Text>
                        <strong>Method:</strong> {order.paymentMethod}
                      </Card.Text>
                      {order.isPaid ? (
                        <MessageBox variant="success">
                          Paid at {order.paidAt}
                        </MessageBox>
                      ) : (
                        <MessageBox variant="warning">Not Paid</MessageBox>
                      )}
                    </Card.Body>
                  </Card>

                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Items</Card.Title>
                      <ListGroup variant="flush">
                        {order.orderItems.map((item) => (
                          <ListGroup.Item key={item._id}>
                            <Row className="align-items-center">
                              <Col md={6}>
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="img-fluid rounded thumbnail"
                                ></img>{' '}
                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                              </Col>
                              <Col md={3}>
                                <span>{item.quantity}</span>
                              </Col>
                              <Col md={3}>${item.price}</Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Order Summary</Card.Title>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Row>
                            <Col>Items</Col>
                            <Col>${order.itemsPrice.toFixed(2)}</Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>Shipping</Col>
                            <Col>${order.shippingPrice.toFixed(2)}</Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>Tax</Col>
                            <Col>${order.taxPrice.toFixed(2)}</Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>
                              <strong> Order Total</strong>
                            </Col>
                            <Col>
                              <strong>${order.totalPrice.toFixed(2)}</strong>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          )
        }

   ```

4. main.tsx

   ```js
   <Route path="/placeorder" element={<PlaceOrderPage />} />
   ```
