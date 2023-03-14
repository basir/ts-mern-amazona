# Video-20-Create-User-Signin-Api

1. userModel.ts

   ```js
      import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose';

      @modelOptions({ schemaOptions: { timestamps: true } })
      export class User {
        public _id?: string;
        @prop({ required: true })
        public name!: string;
        @prop({ required: true, unique: true })
        public email!: string;
        @prop({ required: true })
        public password!: string;
        @prop({ required: true, default: false })
        public isAdmin!: boolean;
      }

      export const UserModel = getModelForClass(User);

   ```

2. npm i bcryptjs
3. data.ts

   ```js
   export const sampleUsers: User[] = [
     {
       name: 'Joe',
       email: 'admin@example.com',
       password: bcrypt.hashSync('123456'),
       isAdmin: true,
     },
     {
       name: 'John',
       email: 'user@example.com',
       password: bcrypt.hashSync('123456'),
       isAdmin: false,
     },
   ]
   ```

4. Seed users

   ```js
   await UserModel.deleteMany({})
   const createdUsers = await UserModel.insertMany(sampleUsers)
   res.send({ createdProducts, createdUsers })
   ```

5. open <http://localhost:4000/api/seed>
6. npm i jsonwebtoken
7. add JWT_SECRET to .env file
8. utils.ts

   ```js
   export const generateToken = (user: User) => {
     return jwt.sign(
       {
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
       },
       process.env.JWT_SECRET || 'somethingsecret',
       {
         expiresIn: '30d',
       }
     )
   }
   ```

9. userRouter.ts

   ```js
   userRouter.post(
     '/signin',
     asyncHandler(async (req: Request, res: Response) => {
       const user = await UserModel.findOne({ email: req.body.email })
       if (user) {
         if (bcrypt.compareSync(req.body.password, user.password)) {
           res.send({
             _id: user._id,
             name: user.name,
             email: user.email,
             isAdmin: user.isAdmin,
             token: generateToken(user),
           })
           return
         }
       }
       res.status(401).send({ message: 'Invalid email or password' })
     })
   )
   ```

10. index.ts

    ```js
    app.use('/api/users', userRouter)
    ```

11. Test using advanced-rest-client
