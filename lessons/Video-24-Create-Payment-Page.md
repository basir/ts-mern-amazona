# Video-24-Create-Payment-Page

1. Store.tsx

   ```js
    type Action =
     | { type: 'SAVE_PAYMENT_METHOD'; payload: string }


    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      }
   ```

2. ShippingAddressPage.ts

   ```js
   export default function PaymentMethodPage() {
     const navigate = useNavigate()
     const { state, dispatch } = useContext(Store)
     const {
       cart: { shippingAddress, paymentMethod },
     } = state

     const [paymentMethodName, setPaymentMethod] = useState(
       paymentMethod || 'PayPal'
     )

     useEffect(() => {
       if (!shippingAddress.address) {
         navigate('/shipping')
       }
     }, [shippingAddress, navigate])
     const submitHandler = (e: React.SyntheticEvent) => {
       e.preventDefault()
       dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName })
       localStorage.setItem('paymentMethod', paymentMethodName)
       navigate('/placeorder')
     }
     return (
       <div>
         <CheckoutSteps step1 step2 step3></CheckoutSteps>
         <div className="container small-container">
           <Helmet>
             <title>Payment Method</title>
           </Helmet>
           <h1 className="my-3">Payment Method</h1>
           <Form onSubmit={submitHandler}>
             <div className="mb-3">
               <Form.Check
                 type="radio"
                 id="PayPal"
                 label="PayPal"
                 value="PayPal"
                 checked={paymentMethodName === 'PayPal'}
                 onChange={(e) => setPaymentMethod(e.target.value)}
               />
             </div>
             <div className="mb-3">
               <Form.Check
                 type="radio"
                 id="Stripe"
                 label="Stripe"
                 value="Stripe"
                 checked={paymentMethodName === 'Stripe'}
                 onChange={(e) => setPaymentMethod(e.target.value)}
               />
             </div>
             <div className="mb-3">
               <Button type="submit">Continue</Button>
             </div>
           </Form>
         </div>
       </div>
     )
   }
   ```

3. main.tsx

   ```js
   <Route path="/payment" element={<PaymentMethodPage />} />
   ```
