# Video-15-Connect-To-MongoDB

1. create mongodb database
2. npm install dotenv mongoose @typegoose/typegoose
3. put mongodb uri in .env
4. MONGODB_URI=mongodb://localhost/tsmernamazona
5. index.ts

   ```js
   dotenv.config()

   const MONGODB_URI =
     process.env.MONGODB_URI || 'mongodb://localhost/tsmernamazona'
   mongoose.set('strictQuery', true)
   mongoose
     .connect(MONGODB_URI)
     .then(() => {
       console.log('connected to mongodb')
     })
     .catch(() => {
       console.log('error mongodb')
     })
   ```

6. models/productModel

   ```js
   import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose'

   @modelOptions({})

   @modelOptions({ schemaOptions: { timestamps: true } })
   export class Product {
     public _id!: string
     @prop({ required: true })
     public name!: string
     @prop({ required: true, unique: true })
     public slug!: string
     @prop({ required: true })
     public image!: string
     @prop()
     public images!: string[]
     @prop({ required: true })
     public brand!: string
     @prop({ required: true })
     public category!: string
     @prop({ required: true })
     public description!: string
     @prop({ required: true, default: 0 })
     public price!: number
     @prop({ required: true, default: 0 })
     public countInStock!: number
     @prop({ required: true, default: 0 })
     public rating!: number
     @prop({ required: true, default: 0 })
     public numReviews!: number
     @prop({ required: true, default: false })
     public isFeatured!: boolean
     @prop()
     public banner?: string
   }

   export const ProductModel = getModelForClass(Product)

   ```

7. npm i express-async-handler
8. productRouter.ts

   ```js
   export const productRouter = express.Router()

   productRouter.get(
     '/',
     asyncHandler(async (req, res) => {
       const products = await ProductModel.find()
       res.json(products)
     })
   )
   ```

9. index.ts

```js
app.use('/api/products', productRouter)
```

10. run <http://localhost:4000/api/products>
11. seedRouter.ts

    ```js
    const seedRouter = express.Router()

    seedRouter.get(
      '/',
      asyncHandler(async (req: Request, res: Response) => {
        await ProductModel.deleteMany({})
        const createdProducts = await ProductModel.insertMany(products)
        res.send({ createdProducts })
      })
    )
    export default seedRouter
    ```
