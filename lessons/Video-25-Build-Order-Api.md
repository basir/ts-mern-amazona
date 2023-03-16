# Video-25-Build-Order-Api

1. orderModel.tsx

   ```js
        import { modelOptions, prop, getModelForClass, Ref } from '@typegoose/typegoose'
      import { Product } from './productModel'
      import { User } from './userModel'

      class ShippingAddress {
        @prop()
        public fullName?: string
        @prop()
        public address?: string
        @prop()
        public city?: string
        @prop()
        public postalCode?: string
        @prop()
        public country?: string
        @prop()
        public lat?: number
        @prop()
        public lng?: number
      }

      class Item {
        @prop({ required: true })
        public name!: string
        @prop({ required: true })
        public quantity!: string
        @prop({ required: true })
        public image!: number
        @prop({ required: true })
        public price!: number
        @prop({ ref: Product })
        public product?: Ref<Product>
      }

      class PaymentResult {
        @prop()
        public paymentId!: string
        @prop()
        public status!: string
        @prop()
        public update_time!: string
        @prop()
        public email_address!: string
      }

      @modelOptions({ schemaOptions: { timestamps: true } })
      export class Order {
        public _id!: string
        @prop()
        public orderItems!: Item[]
        @prop()
        public shippingAddress?: ShippingAddress

        @prop({ ref: User })
        public user?: Ref<User>

        @prop({ required: true })
        public paymentMethod!: string
        @prop()
        public paymentResult?: PaymentResult
        @prop({ required: true, default: 0 })
        public itemsPrice!: number
        @prop({ required: true, default: 0 })
        public shippingPrice!: number
        @prop({ required: true, default: 0 })
        public taxPrice!: number
        @prop({ required: true, default: 0 })
        public totalPrice!: number
        @prop({ required: true, default: false })
        public isPaid!: boolean
        @prop()
        public paidAt!: Date
        @prop({ required: true, default: false })
        public isDelivered!: boolean
        @prop()
        public deliveredAt!: Date
      }

      export const OrderModel = getModelForClass(Order)

   ```

2. orderRouter.ts

   ```js
   orderRouter.post(
     '/',
     isAuth,
     asyncHandler(async (req: Request, res: Response) => {
       if (req.body.orderItems.length === 0) {
         res.status(400).send({ message: 'Cart is empty' })
       } else {
         const createdOrder = await OrderModel.create({
           orderItems: req.body.orderItems.map((x: Product) => ({
             ...x,
             product: x._id,
           })),
           shippingAddress: req.body.shippingAddress,
           paymentMethod: req.body.paymentMethod,
           itemsPrice: req.body.itemsPrice,
           shippingPrice: req.body.shippingPrice,
           taxPrice: req.body.taxPrice,
           totalPrice: req.body.totalPrice,
           user: req.user._id,
         })
         res
           .status(201)
           .send({ message: 'Order Not Found', order: createdOrder })
       }
     })
   )
   ```

3. index.tsx

   ```js
   app.use('/api/orders', orderRouter)
   ```
