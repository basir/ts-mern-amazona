# Video-22-Register-User

1. userrouter.ts

   ```js

      userRouter.post(
        '/signup',
        asyncHandler(async (req: Request, res: Response) => {
          const user = await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
          } as User)

          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
          })
        })
      )

   ```

2. userHooks.ts

   ```js

    export const useSignupMutation = () =>
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
        await apiClient.post<UserInfo>(`api/users/signup`, {
          name,
          email,
          password,
        })
      ).data,
   })


   ```

3. SigninPage.ts

   ```js

      export default function SignupPage() {
        const navigate = useNavigate()
        const { search } = useLocation()
        const redirectInUrl = new URLSearchParams(search).get('redirect')
        const redirect = redirectInUrl ? redirectInUrl : '/'

        const [name, setName] = useState('')
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [confirmPassword, setConfirmPassword] = useState('')

        const { state, dispatch } = useContext(Store)
        const { userInfo } = state

        const { mutateAsync: signup, isLoading } = useSignupMutation()

        const submitHandler = async (e: React.SyntheticEvent) => {
          e.preventDefault()
          if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
          }
          try {
            const data = await signup({
              name,
              email,
              password,
            })
            dispatch({ type: 'USER_SIGNIN', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate(redirect || '/')
          } catch (err) {
            toast.error(getError(err as ApiError))
          }
        }

        useEffect(() => {
          if (userInfo) {
            navigate(redirect)
          }
        }, [navigate, redirect, userInfo])

        return (
          <Container className="small-container">
            <Helmet>
              <title>Sign Up</title>
            </Helmet>
            <h1 className="my-3">Sign Up</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={(e) => setName(e.target.value)} required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />

                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
              </Form.Group>
              <div className="mb-3">
                <Button type="submit">Sign Up</Button>
              </div>
              <div className="mb-3">
                Already have an account?{' '}
                <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
              </div>
            </Form>
          </Container>
        )
      }


   ```

4. main.tsx

   ```js
   <Route path="/signup" element={<SignupPage />} />
   ```
