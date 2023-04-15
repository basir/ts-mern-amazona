# Video-33-Add-Sidebar-SearchBox

1. userRouter.ts

   ```js
   userRouter.put(
     '/profile',
     isAuth,
     asyncHandler(async (req: Request, res: Response) => {
       const user = await UserModel.findById(req.user._id)
       if (user) {
         user.name = req.body.name || user.name
         user.email = req.body.email || user.email

         if (req.body.password) {
           user.password = bcrypt.hashSync(req.body.password, 8)
         }
         const updatedUser = await user.save()
         res.send({
           _id: updatedUser._id,
           name: updatedUser.name,
           email: updatedUser.email,
           isAdmin: updatedUser.isAdmin,
           token: generateToken(updatedUser),
         })
       }
     })
   )
   ```

2. userHooks.ts

   ```js
      export const useUpdateProfileMutation = () =>
        useMutation({
          mutationFn: async ({
            name,
            email,
            password,
          }: {
            name: string
            email: string
            password: string
          }) =>
            (
              await apiClient.put<UserInfo>(`api/users/profile`, {
                name,
                email,
                password,
              })
            ).data,
        })

   ```

3. ProfilePage.ts

   ```js

    export default function ProfilePage() {
      const { state, dispatch } = useContext(Store)
      const { userInfo } = state
      const [name, setName] = useState(userInfo!.name)
      const [email, setEmail] = useState(userInfo!.email)
      const [password, setPassword] = useState('')
      const [confirmPassword, setConfirmPassword] = useState('')

      const { mutateAsync: updateProfile, isLoading } = useUpdateProfileMutation()

      const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
          if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
          }
          const data = await updateProfile({
            name,
            email,
            password,
          })

          dispatch({ type: 'USER_SIGNIN', payload: data })
          localStorage.setItem('userInfo', JSON.stringify(data))
          toast.success('User updated successfully')
        } catch (err) {
          toast.error(getError(err as ApiError))
        }
      }

      return (
        <div className="container small-container">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="my-3">User Profile</h1>
      <form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button disabled={isLoading} type="submit">
            Update
          </Button>
          {isLoading && <LoadingBox></LoadingBox>}
        </div>
      </form>
    </div>
   )
   }


   ```

4. main.tsx

   ```js
   <Route path="/profile" element={<ProfilePage />} />
   ```

5. App.tsx

   ```js
   <LinkContainer to="/profile">
     <NavDropdown.Item>User Profile</NavDropdown.Item>
   </LinkContainer>
   ```
