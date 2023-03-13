# Video-16-Implement-Add-To-Cart

1. Cart.ts

   ```js
        export type CartItem = {
        image: string | undefined
        slug: any
        quantity: number
        countInStock: any
        price: number
        _id: string
        name: string
      }
      export type ShippingAddress = {
        fullName: string
        address: string
        city: string
        country: string
        postalCode: string
      }

      export type Cart = {
        itemsPrice: number
        shippingPrice: number
        taxPrice: number
        totalPrice: number
        cartItems: CartItem[]
        shippingAddress: ShippingAddress
        paymentMethod: string
      }

   ```

2. Store.js

   ```js
        type AppState = {
        mode: string
        cart: Cart
      }

      const initialState: AppState = {
        cart: {
          cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems')!)
            : [],
          shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress')!)
            : { location: {} },
          paymentMethod: localStorage.getItem('paymentMethod')
            ? localStorage.getItem('paymentMethod')!
            : 'PayPal',
          itemsPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
        },
      }

      type Action =
          | { type: 'SWITCH_MODE' }
          | { type: 'CART_ADD_ITEM'; payload: CartItem }

     // reducer
        case 'CART_ADD_ITEM':
          const newItem = action.payload
          const existItem = state.cart.cartItems.find(
            (item: CartItem) => item._id === newItem._id
          )
          const cartItems = existItem
            ? state.cart.cartItems.map((item: CartItem) =>
                item._id === existItem._id ? newItem : item
              )
            : [...state.cart.cartItems, newItem]
          localStorage.setItem('cartItems', JSON.stringify(cartItems))
          return { ...state, cart: { ...state.cart, cartItems } }

   ```

3. App.tsx

   ```js

    const { {mode, cart}, dispatch } = useContext(Store)

        <LinkContainer to="/">
                <Navbar.Brand>amazona</Navbar.Brand>
              </LinkContainer>
        <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>

   ```

4. utils.ts

   ```js
   export const convertProductToCartItem = (product: Product): CartItem => {
     const cartItem: CartItem = {
       _id: product._id,
       name: product.name,
       slug: product.slug,
       image: product.image,
       price: product.price,
       countInStock: product.countInStock,
       quantity: 1,
     }
     return cartItem
   }
   ```

5. ProductItem.ts

   ```js
   const { state, dispatch: ctxDispatch } = useContext(Store)
   const {
     cart: { cartItems },
   } = state

   const addToCartHandler = async (item: CartItem) => {
     const existItem = cartItems.find((x) => x._id === product._id)
     const quantity = existItem ? existItem.quantity + 1 : 1
     if (product.countInStock < quantity) {
       toast.warn('Sorry. Product is out of stock')
       return
     }
     ctxDispatch({
       type: 'CART_ADD_ITEM',
       payload: { ...item, quantity },
     })
     toast.success('Product added to the cart')
   }
   ...
       <Button
               onClick={() => addToCartHandler(convertProductToCartItem(product))}
             >
               Add to cart
             </Button>
   ```
