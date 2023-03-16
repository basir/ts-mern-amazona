# Video-28-Pay-Order-By-PayPal

1. Create PayPal Developer Account
2. Get PayPal Client Id
3. Save in .env as PAYPAL_CLIENT_ID
4. keyRouter.ts

   ```js
   import express from 'express'

   const keyRouter = express.Router()

   keyRouter.get('/paypal', (req, res) => {
     res.send({ clientId: process.env.PAYPAL_CLIENT_ID || 'sb' })
   })
   ```

5. index.ts

   ```js
   app.use('/api/keys', keyRouter)
   ```

6. orderRouter.ts

   ```js
   orderRouter.put(
     '/:id/pay',
     isAuth,
     asyncHandler(async (req: Request, res: Response) => {
       const order = await OrderModel.findById(req.params.id).populate('user')

       if (order) {
         order.isPaid = true
         order.paidAt = new Date(Date.now())
         order.paymentResult = {
           paymentId: req.body.id,
           status: req.body.status,
           update_time: req.body.update_time,
           email_address: req.body.email_address,
         }
         const updatedOrder = await order.save()

         res.send(updatedOrder)
       } else {
         res.status(404).send({ message: 'Order Not Found' })
       }
     })
   )
   ```

7. orderHooks.ts

   ```js
   export const useGetPaypalClientIdQuery = () =>
     useQuery({
       queryKey: ['paypal-clientId'],
       queryFn: async () =>
         ((await apiClient.get) < { clientId: string } > `/api/keys/paypal`)
           .data,
     })

   export const usePayOrderMutation = () =>
      useMutation({
        mutationFn: async (details: { orderId: string }) =>
          (
            await apiClient.put<{ message: string; order: Order }>(
              `api/orders/${details.orderId}/pay`,
              details
            )
          ).data,
      })
   ```

8. npm i @paypal/react-paypal-js
9. main.tsx

   ```js

     import { PayPalScriptProvider } from '@paypal/react-paypal-js'

      <PayPalScriptProvider
         options={{ 'client-id': 'sb' }}
         deferLoading={true}
       >
       ...

   ```

10. OrderPage.ts

```js

   const {
     ...
     refetch,
   } = useGetOrderDetailsQuery(orderId!)

     const testPayHandler = () => {
       payOrder({ orderId: orderId! })
       refetch()
       toast.success('Order is paid')
     }
     const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
       style: { layout: 'vertical' },
       createOrder(data, actions) {
         return actions.order
           .create({
             purchase_units: [
               {
                 amount: {
                   value: order!.totalPrice.toString(),
                 },
               },
             ],
           })
           .then((orderID: string) => {
             return orderID
           })
       },
       onApprove(data, actions) {
         return actions.order!.capture().then(async (details) => {
           try {
             payOrder({ orderId: orderId!, ...details })
             refetch()
             toast.success('Order is paid')
           } catch (err) {
             toast.error(getError(err as ApiError))
           }
         })
       },
       onError: (err) => {
         toast.error(getError(err as ApiError))
       },
     }
     const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer()
     const { data: paypalConfig } = useGetPaypalClientIdQuery()

     useEffect(() => {
       if (paypalConfig && paypalConfig.clientId) {
         const loadPaypalScript = async () => {
           paypalDispatch({
             type: 'resetOptions',
             value: {
               'client-id': paypalConfig!.clientId,
               currency: 'USD',
             },
           })
           paypalDispatch({
             type: 'setLoadingStatus',
             value: SCRIPT_LOADING_STATE.PENDING,
           })
         }
         loadPaypalScript()
       }
     }, [paypalConfig])
     const { mutateAsync: payOrder, isLoading: loadingPay } = usePayOrderMutation()


     return (
       ...
       {!order.isPaid && (
               <ListGroup.Item>
                 {isPending ? (
                   <LoadingBox />
                 ) : isRejected ? (
                   <MessageBox variant="danger">
                     Error in connecting to PayPal
                   </MessageBox>
                 ) : (
                   <div>
                     <PayPalButtons
                       {...paypalbuttonTransactionProps}
                     ></PayPalButtons>
                     <Button onClick={testPayHandler}>Test Pay</Button>
                   </div>
                 )}
                 {loadingPay && <LoadingBox></LoadingBox>}
               </ListGroup.Item>
             )}
     )

```

9. main.tsx

```js
<Route path="/placeorder" element={<PlaceOrderPage />} />
```
