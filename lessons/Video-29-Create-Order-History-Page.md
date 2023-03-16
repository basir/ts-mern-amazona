# Video-29-Create-Order-History-Page

1. orderRouter.ts

   ```js
   orderRouter.get(
     '/mine',
     isAuth,
     asyncHandler(async (req: Request, res: Response) => {
       const orders = await OrderModel.find({ user: req.user._id })
       res.send(orders)
     })
   )
   ```

2. orderHooks.ts

   ```js
   export const useGetOrderHistoryQuery = () =>
     useQuery({
       queryKey: ['order-history'],
       queryFn: async () =>
         ((await apiClient.get) < [Order] > `/api/orders/mine`).data,
     })
   ```

3. OrderHistoryPage.ts

   ```js
     export default function OrderHistoryPage() {
       const navigate = useNavigate()
       const { data: orders, isLoading, error } = useGetOrderHistoryQuery()

       return (
         <div>
           <Helmet>
             <title>Order History</title>
           </Helmet>

           <h1>Order History</h1>
           {isLoading ? (
             <LoadingBox></LoadingBox>
           ) : error ? (
             <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
           ) : (
             <table className="table">
               <thead>
                 <tr>
                   <th>ID</th>
                   <th>DATE</th>
                   <th>TOTAL</th>
                   <th>PAID</th>
                   <th>DELIVERED</th>
                   <th>ACTIONS</th>
                 </tr>
               </thead>
               <tbody>
                 {orders!.map((order) => (
                   <tr key={order._id}>
                     <td>{order._id}</td>
                     <td>{order.createdAt.substring(0, 10)}</td>
                     <td>{order.totalPrice.toFixed(2)}</td>
                     <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                     <td>
                       {order.isDelivered
                         ? order.deliveredAt.substring(0, 10)
                         : 'No'}
                     </td>
                     <td>
                       <Button
                         type="button"
                         variant="light"
                         onClick={() => {
                           navigate(`/order/${order._id}`)
                         }}
                       >
                         Details
                       </Button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           )}
         </div>
       )
     }


   ```

4. main.tsx

   ```js
   <Route path="/orderhistory" element={<OrderHistoryPage />} />
   ```

5. App.tsx

   ```js
   <LinkContainer to="/orderhistory">
     <NavDropdown.Item>Order History</NavDropdown.Item>
   </LinkContainer>
   ```
