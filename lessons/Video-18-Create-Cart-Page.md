# Video-18-Create-Cart-Page

1. CartPage.ts

   ```js
   export default function CartPage() {
     const navigate = useNavigate()
     const {
       state: {
         cart: { cartItems },
       },
       dispatch,
     } = useContext(Store)

     const updateCartHandler = async (item: CartItem, quantity: number) => {
       if (item.countInStock < quantity) {
         toast.warn('Sorry. Product is out of stock')
         return
       }
       dispatch({
         type: 'CART_ADD_ITEM',
         payload: { ...item, quantity },
       })
     }

     return (
       <div>
         <Helmet>
           <title>Shopping Cart</title>
         </Helmet>
         <h1>Shopping Cart</h1>
         <Row>
           <Col md={8}>
             {cartItems.length === 0 ? (
               <MessageBox>
                 Cart is empty. <Link to="/">Go Shopping</Link>
               </MessageBox>
             ) : (
               <ListGroup>
                 {cartItems.map((item: CartItem) => (
                   <ListGroup.Item key={item._id}>
                     <Row className="align-items-center">
                       <Col md={4}>
                         <img
                           src={item.image}
                           alt={item.name}
                           className="img-fluid rounded img-thumbnail"
                         ></img> <Link to={`/product/${item.slug}`}>{item.name}</Link>
                       </Col>
                       <Col md={3}>
                         <Button
                           onClick={() =>
                             updateCartHandler(item, item.quantity - 1)
                           }
                           variant="light"
                           disabled={item.quantity === 1}
                         >
                           <i className="fas fa-minus-circle"></i>
                         </Button>{' '}
                         <span>{item.quantity}</span>{' '}
                         <Button
                           variant="light"
                           onClick={() =>
                             updateCartHandler(item, item.quantity + 1)
                           }
                           disabled={item.quantity === item.countInStock}
                         >
                           <i className="fas fa-plus-circle"></i>
                         </Button>
                       </Col>
                       <Col md={3}>${item.price}</Col>
                       <Col md={2}>
                         <Button
                           onClick={() => removeItemHandler(item)}
                           variant="light"
                         >
                           <i className="fas fa-trash"></i>
                         </Button>
                       </Col>
                     </Row>
                   </ListGroup.Item>
                 ))}
               </ListGroup>
             )}
           </Col>
           <Col md={4}>
             <Card>
               <Card.Body>
                 <ListGroup variant="flush">
                   <ListGroup.Item>
                     <h3>
                       Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                       items) : $
                       {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                     </h3>
                   </ListGroup.Item>
                   <ListGroup.Item>
                     <div className="d-grid">
                       <Button
                         type="button"
                         variant="primary"
                         onClick={checkoutHandler}
                         disabled={cartItems.length === 0}
                       >
                         Proceed to Checkout
                       </Button>
                     </div>
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

2. main.ts

   ```js
   <Route path="/cart" element={<CartPage />} />
   ```
