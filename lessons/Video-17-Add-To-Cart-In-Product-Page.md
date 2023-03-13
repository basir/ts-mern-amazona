# Video-17-Add-To-Cart-In-Product-Page

1. ProductPage.ts

   ```js

      const { state, dispatch } = useContext(Store)
      const { cart } = state
      const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === product!._id)
        const quantity = existItem ? existItem.quantity + 1 : 1
        if (product!.countInStock < quantity) {
          toast.warn('Sorry. Product is out of stock')
          return
        }
        dispatch({
          type: 'CART_ADD_ITEM',
          payload: { ...convertProductToCartItem(product!), quantity },
        })
        toast.success('Product added to the cart')
        navigate('/cart')
      }
      ...
      <Button onClick={addToCartHandler} variant="primary">
                        Add to Cart
      </Button>

   ```

2. npm i react-router-bootstrap
3. App.tsx

   ```js
   <LinkContainer to="/">
     <Navbar.Brand>amazona</Navbar.Brand>
   </LinkContainer>
   ```
