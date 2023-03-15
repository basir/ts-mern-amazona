# Video-23-Create-Shipping-Page

1. Cart.ts

   ```js

      export type ShippingAddress = {
        fullName: string
        address: string
        city: string
        country: string
        postalCode: string
        location: Location
      }

   ```

2. Store.tsx

   ```js
    type Action = | { type: 'SAVE_SHIPPING_ADDRESS'; payload: ShippingAddress }

    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      }
   ```

3. CheckoutSteps.ts

   ```js
      export default function CheckoutSteps(props: {
        step1?: boolean
        step2?: boolean
        step3?: boolean
        step4?: boolean
      }) {
        return (
          <Row className="checkout-steps">
            <Col className={props.step1 ? 'active' : ''}>Sign-In</Col>
            <Col className={props.step2 ? 'active' : ''}>Shipping</Col>
            <Col className={props.step3 ? 'active' : ''}>Payment</Col>
            <Col className={props.step4 ? 'active' : ''}>Place Order</Col>
          </Row>
        )
      }
   ```

4. ShippingAddressPage.ts

   ```js
   export default function ShippingAddressPage() {
     const navigate = useNavigate()
     const { state, dispatch } = useContext(Store)
     const {
       fullBox,
       userInfo,
       cart: { shippingAddress },
     } = state
     const [fullName, setFullName] = useState(shippingAddress.fullName || '')
     const [address, setAddress] = useState(shippingAddress.address || '')
     const [city, setCity] = useState(shippingAddress.city || '')
     const [postalCode, setPostalCode] = useState(
       shippingAddress.postalCode || ''
     )
     useEffect(() => {
       if (!userInfo) {
         navigate('/signin?redirect=/shipping')
       }
     }, [userInfo, navigate])
     const [country, setCountry] = useState(shippingAddress.country || '')
     const submitHandler = (e: React.SyntheticEvent) => {
       e.preventDefault()
       dispatch({
         type: 'SAVE_SHIPPING_ADDRESS',
         payload: {
           fullName,
           address,
           city,
           postalCode,
           country,
           location: shippingAddress.location,
         },
       })
       localStorage.setItem(
         'shippingAddress',
         JSON.stringify({
           fullName,
           address,
           city,
           postalCode,
           country,
           location: shippingAddress.location,
         })
       )
       navigate('/payment')
     }

     useEffect(() => {
       dispatch({ type: 'SET_FULLBOX_OFF' })
     }, [dispatch, fullBox])

     return (
       <div>
         <Helmet>
           <title>Shipping Address</title>
         </Helmet>

         <CheckoutSteps step1 step2></CheckoutSteps>
         <div className="container small-container">
           <h1 className="my-3">Shipping Address</h1>
           <Form onSubmit={submitHandler}>
             <Form.Group className="mb-3" controlId="fullName">
               <Form.Label>Full Name</Form.Label>
               <Form.Control
                 value={fullName}
                 onChange={(e) => setFullName(e.target.value)}
                 required
               />
             </Form.Group>
             <Form.Group className="mb-3" controlId="address">
               <Form.Label>Address</Form.Label>
               <Form.Control
                 value={address}
                 onChange={(e) => setAddress(e.target.value)}
                 required
               />
             </Form.Group>
             <Form.Group className="mb-3" controlId="city">
               <Form.Label>City</Form.Label>
               <Form.Control
                 value={city}
                 onChange={(e) => setCity(e.target.value)}
                 required
               />
             </Form.Group>
             <Form.Group className="mb-3" controlId="postalCode">
               <Form.Label>Postal Code</Form.Label>
               <Form.Control
                 value={postalCode}
                 onChange={(e) => setPostalCode(e.target.value)}
                 required
               />
             </Form.Group>
             <Form.Group className="mb-3" controlId="country">
               <Form.Label>Country</Form.Label>
               <Form.Control
                 value={country}
                 onChange={(e) => setCountry(e.target.value)}
                 required
               />
             </Form.Group>
             <div className="mb-3">
               <Button
                 id="chooseOnMap"
                 type="button"
                 variant="light"
                 onClick={() => navigate('/map')}
               >
                 Choose Location On Map
               </Button>
               {shippingAddress.location && shippingAddress.location.lat ? (
                 <div>
                   LAT: {shippingAddress.location.lat}
                   LNG:{shippingAddress.location.lng}
                 </div>
               ) : (
                 <div>No location</div>
               )}
             </div>

             <div className="mb-3">
               <Button variant="primary" type="submit">
                 Continue
               </Button>
             </div>
           </Form>
         </div>
       </div>
     )
   }
   ```

5. main.tsx

   ```js
   <Route path="/shipping" element={<ShippingAddressPage />} />
   ```
