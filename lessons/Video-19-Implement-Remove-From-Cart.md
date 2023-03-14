# Video-19-Implement-Remove-From-Cart

1. CartPage.ts

   ```js
   const removeItemHandler = (item: CartItem) => {
     dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
   }
   ...
    <Button
       onClick={() => removeItemHandler(item)}
           variant="light"
            >
        <i className="fas fa-trash"></i>
      </Button>
   ```

2. Store.tsx

   ```js
       case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item: CartItem) => item._id !== action.payload._id
      )
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    }
   ```
